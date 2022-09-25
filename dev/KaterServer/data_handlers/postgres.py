from redirect import allSqls, AsIs, config, demjson,  getSchemaSearchPath, global_settings, json, jsonify, logger, messages, pool, psycopg2, RealDictCursor, repeat
from core.generic_classes import GenericException

poolStore = {}


def execSql(context, sqlString, args=None, isMultipleRows=True,  autoCommitMode=False, schema='public'):
    out = None
    connection = None
    dbName = context.get('dbName', None)
    cursor = context.get('cursor', None)
    connection = context.get('connection', None)
    searchPathSql = getSchemaSearchPath(schema)
    try:
        if ((cursor is None) or (connection is None)):
            connection, cursor, pool = getConnectionCursor(dbName,
                                                           autoCommitMode)
        cursor.execute(f'{searchPathSql};{sqlString}', args)
        try:
            if isMultipleRows:
                out = cursor.fetchall()
            else:
                out = cursor.fetchone()
        except (Exception) as err:
            out = None
            logger.error('')
            raise err
        if not autoCommitMode:
            connection.commit()
    except (Exception) as error:
        if connection:
            connection.rollback()
        logger.error(getattr(error, 'pgerror', 'Sql execution failure'))
        errName = 'errSqlExecError'
        raiseGenericException(errName)
    finally:
        if connection:
            cursor.close()
            connection.close()
    return out

# details always has 'data' object. The data may not have 'details' object


def execSqlObject(context, sqlObject, fkeyValue=None, schema='public'):
    ret = None
    dbName = context['dbName']
    connection, cursor, _ = getConnectionCursor(dbName)
    context['cursor'] = cursor
    context['connection'] = connection
    context['schema'] = schema
    try:
        ret = execSqlObjectWorker(context, sqlObject, fkeyValue)
        connection.commit()
    except (Exception) as error:
        if (connection):
            connection.rollback()
        raise Exception(error)
    finally:
        if connection:
            cursor.close()
            connection.close()

    return (ret)


def execSqlObjectWorker(context, sqlObject, fkeyValue):
    ret = None
    if 'deletedIds' in sqlObject:
        processDeletedIds(context, sqlObject)
    data = sqlObject.get('data', None)
    if (data):
        if type(data) is list:
            for dataItem in data:
                ret = processData(context, sqlObject, dataItem,  fkeyValue)
        else:
            ret = processData(context, sqlObject, data, fkeyValue)
    return (ret)


def getConnectionCursor(dbName, autoCommitMode=False):
    pool = getPool(dbName)
    connection = pool.getconn()
    if autoCommitMode:
        connection.autocommit = True
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    return connection, cursor, pool


def getGeneratedId(context, sqlObject):
    id = None
    schema = context.get('schema')
    cursor = context.get('cursor')
    idGeneratorTableName = ''
    tableName = sqlObject.get('tableName', None)
    searchPathSql = getSchemaSearchPath(schema)
    if (sqlObject.get('generateId', None)):
        idGeneratorTableName = sqlObject.get('idGeneratorTableName', '')
    if (idGeneratorTableName):
        sqlString = allSqls['get-generated-id']
        paramsDict = {
            'idGeneratorTableName': AsIs(f'"{idGeneratorTableName}"'),
            'tableName': tableName
        }
        # ret = cursor.mogrify(f'{searchPathSql};{sqlString}', paramsDict)
        # print(ret)
        cursor.execute(f'{searchPathSql};{sqlString}', paramsDict)
        record = cursor.fetchone()
        jsonString = json.dumps(record)
        jsonObj = json.loads(jsonString)
        id = jsonObj.get('id', None)
    return (id)


def getInsertSql(sqlObject, data, fkeyValue):
    tableName = sqlObject.get('tableName')
    # cursor = context.get('cursor')
    fkeyName = sqlObject.get('fkeyName')
    fieldsList = list(data.keys())

    if fkeyName and fkeyValue:
        fieldsList.append(fkeyName)

    fieldsCount = len(fieldsList)
    fieldsString = '"{0}"'.format('", "'.join(
        fieldsList))  # surround fields with ""
    placeholdersForValues = ', '.join(list(repeat('%s', fieldsCount)))

    valuesList = list(data.values())
    if fkeyName and fkeyValue:
        valuesList.append(fkeyValue)
    valuesTuple = tuple(valuesList)
    sql = f'''insert into "{tableName}"
    ({fieldsString}) values({placeholdersForValues}) returning id
    '''
    return (sql, valuesTuple)


def getPool(dbName):
    ref = config['baseConnection']
    if not dbName in poolStore:
        poolStore[dbName] = pool.ThreadedConnectionPool(
            1, 500, user=ref['user'], password=ref['password'], host=ref['host'], port=ref['port'], database=dbName)
    return poolStore[dbName]


def getSql(context, sqlObject, fkeyValue):
    sql = None
    valuesTuple = None
    data = sqlObject.get('data')
    updateCodeBlock = sqlObject.get('updateCodeBlock', None)
    customCodeBlock = sqlObject.get('customCodeBlock', None)
    insertCodeBlock = sqlObject.get('insertCodeBlock', None)

    id = getGeneratedId(context, sqlObject)
    if (id):  # generated id from LastIdTable
        data['id'] = id
        sqlObject['idInsert'] = True

    if (customCodeBlock):
        sql, valuesTuple = (customCodeBlock, data)
    elif (data.get('id', None)):
        if (updateCodeBlock):
            sql, valuesTuple = (updateCodeBlock, data)
        elif sqlObject.get('idInsert'):
            sql, valuesTuple = getInsertSql(sqlObject, data.copy(), fkeyValue)
        else:
            sql, valuesTuple = getUpdateSql(data, sqlObject.get('tableName'))
    else:
        if (insertCodeBlock):
            sql, valuesTuple = (insertCodeBlock, data)
        else:
            sql, valuesTuple = getInsertSql(sqlObject, data.copy(), fkeyValue)
    return (sql, valuesTuple)


def getUpdateSql(data, tableName):
    def getUpdateKeyValues(dataCopy):
        # idValue = dataCopy['id']
        dataCopy.pop('id')  # remove id property
        str = ''
        for it in dataCopy:
            str = str + f''' "{it}" = %s, '''
        str = (str.strip())[:-1]  # strip last comma
        valuesList = list(dataCopy.values())
        valuesTuple = tuple(valuesList)
        return (str, valuesTuple)

    str, valuesTuple = getUpdateKeyValues(data.copy())
    sql = f'''update "{tableName}" set {str}
        where id = {data['id']} returning {"id"}
    '''
    return (sql, valuesTuple)


def updateLastId(context, sqlObject, data):
    sqlString = allSqls['update-last-id']
    cursor = context.get('cursor')
    lastId = data.get('id', None)
    schema = context.get('schema')
    idGeneratorTableName = sqlObject.get('idGeneratorTableName')
    searchPathSql = getSchemaSearchPath(schema)
    paramsObj = {
        'idGeneratorTableName': AsIs(f'"{idGeneratorTableName}"'),
        'lastId': lastId,
        'tableName': sqlObject.get('tableName')
    }
    # print(cursor.mogrify(f'{searchPathSql};{sqlString}', paramsObj))
    cursor.execute(f'{searchPathSql};{sqlString}', paramsObj)
    print(1)


def processData(context, sqlObject, data,  fkeyValue):
    id = None
    cursor = context.get('cursor')
    schema = context.get('schema')
    searchPathSql = getSchemaSearchPath(schema)
    sql, tup = getSql(context, sqlObject, fkeyValue)
    # sql = '''update "ClientM" set "clientName" ='demo1' where id = 1 returning id'''
    if (sql):
        cursor.execute(f'{searchPathSql};{sql}', tup)
        if (cursor.rowcount > 0):
            record = cursor.fetchone()
            jsonString = demjson.encode(record)
            jsonObj = demjson.decode(jsonString)
            id = jsonObj.get('id', None)

            if (sqlObject.get('idGeneratorTableName', None) and (sqlObject.get('generateId', None))):
                updateLastId(context, sqlObject, data)
    # details = data.pop(details, None)
    details = data.get('details', None)
    if (details):
        if (type(details) is list):
            for detailsItem in details:
                execSqlObjectWorker(context, detailsItem, id)
        else:
            execSqlObjectWorker(context, details, id)
    return (id)


def processDeletedIds(context, sqlObject):
    deletedIdList = sqlObject.get('deletedIds')
    tableName = sqlObject.get('tableName')
    cursor = context.get('cursor')
    ret = '('
    for x in deletedIdList:
        ret = ret + str(x) + ','
    ret = ret.rstrip(',') + ')'
    sql = f'''delete from "{tableName}" where id in{ret}'''
    cursor.execute(sql)


def raiseGenericException(errName):
    raise GenericException(
        code=messages[errName][0], name=errName, message=messages[errName][1])
