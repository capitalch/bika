from redirect import config,  getSchemaSearchPath, global_settings, logger, messages, psycopg2,  RealDictCursor, repeat
from psycopg2 import pool
from core.generic_classes import GenericException

poolStore = {}


def execSql(context, sqlString, args=None, isMultipleRows=True,  autoCommitMode=False, schema='public'):
    out = None
    connection = None
    dbName = context['dbName']
    searchPathSql = getSchemaSearchPath(schema)
    try:
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

# details always has data. The data may not have details


def execSqlObject(context, sqlObject, fkeyValue=None):
    ret = None
    dbName = context['dbName']
    _, cursor, _ = getConnectionCursor(dbName)
    context['cursor'] = cursor
    try:
        if 'deletedIds' in sqlObject:
            processDeletedIds(context, sqlObject)
        data = sqlObject.get('data', None)
        if (data):
            if type(data) is list:
                for dat in data:
                    ret = processData(context, dat, sqlObject, fkeyValue)
            else:
                ret = processData(context, data, sqlObject, fkeyValue)

    except (Exception) as error:
        raise Exception(error)

    return (ret)


def getConnectionCursor(dbName, autoCommitMode=False):
    pool = getPool(dbName)
    connection = pool.getconn()
    if autoCommitMode:
        connection.autocommit = True
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    return connection, cursor, pool


def getInsertSql(data, tableName, fkeyName, fkeyValue):
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


def getSql(sqlObject, fkeyValue):
    sql = None
    valuesTuple = None
    data = sqlObject.get('data')
    updateCodeBlock = sqlObject.get('updateCodeBlock', None)
    customCodeBlock = sqlObject.get('customCodeBlock', None)
    insertCodeBlock = sqlObject.get('insertCodeBlock', None)
    if (customCodeBlock):
        sql, valuesTuple = (customCodeBlock, data)
    elif (data.get('id', None)):
        if (updateCodeBlock):
            sql, valuesTuple = (updateCodeBlock, data)
        elif sqlObject.get('idInsert'):
            sql, valuesTuple = getInsertSql(data.copy(), sqlObject.get(
                'tableName'), sqlObject.get('fkeyName'), fkeyValue)
        else:
            sql, valuesTuple = getUpdateSql(data, sqlObject.get('tableName'))
    else:
        if (insertCodeBlock):
            sql, valuesTuple = (insertCodeBlock, data)
        else:
            sql, valuesTuple = getInsertSql(data.copy(), sqlObject.get(
                'tableName'), sqlObject.get('fkeyName'), fkeyValue)
    return (sql, valuesTuple)


def getUpdateSql(data, tableName):
    def getUpdateKeyValues(dataCopy):
        idValue = dataCopy['id']
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


def processData(context, data, sqlObject, fkeyValue):
    id = None
    cursor = context.get('cursor')
    sql, tup = getSql(sqlObject, fkeyValue)
    if (sql):
        cursor.execute(sql, tup)
        if (cursor.rowcount > 0):
            record = cursor.fetchone()
            id = record[0]
    details = data.pop(details, None)
    if (details):
        if (type(details) is list):
            for detail in details:
                execSqlObject(context, detail, id)
        else:
            execSqlObject(context, details, id)
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
