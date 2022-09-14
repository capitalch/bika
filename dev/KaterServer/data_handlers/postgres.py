from redirect import config,  getSchemaSearchPath, global_settings, logger, messages, psycopg2,  RealDictCursor
from psycopg2 import pool
from core.generic_classes import GenericException

poolStore = {}
# dbName = ''


def execSql(dbName, sqlString, args=None, isMultipleRows=True,  autoCommitMode=False, schema='public'):
    out = None
    connection = None
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


def getConnectionCursor(dbName, autoCommitMode=False):
    pool = getPool(dbName)
    connection = pool.getconn()
    if autoCommitMode:
        connection.autocommit = True
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    return connection, cursor, pool


def getPool(dbName):
    ref = config['baseConnection']
    # dbName = global_settings.get('dbName', None)
    # if (dbName in (None, '')):
    #     dbName = 'authentication'
    if not dbName in poolStore:
        poolStore[dbName] = pool.ThreadedConnectionPool(
            1, 500, user=ref['user'], password=ref['password'], host=ref['host'], port=ref['port'], database=dbName)
    return poolStore[dbName]


def raiseGenericException(errName):
    raise GenericException(
        code=messages[errName][0], name=errName, message=messages[errName][1])
