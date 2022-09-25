from psycopg2.extensions import AsIs
from psycopg2.extras import RealDictCursor
from psycopg2 import pool, sql
import simplejson as json
from sql import allSqls

config = None
with open('config.json') as f:
    config = json.load(f)

poolStore = {}


def getConnectionCursor(dbName, autoCommitMode=False):
    pool = getPool(dbName)
    connection = pool.getconn()
    if autoCommitMode:
        connection.autocommit = True
    cursor = connection.cursor(cursor_factory=RealDictCursor)
    return connection, cursor, pool


def getPool(dbName):
    ref = config['baseConnection']
    if not dbName in poolStore:
        poolStore[dbName] = pool.ThreadedConnectionPool(
            1, 500, user=ref['user'], password=ref['password'], host=ref['host'], port=ref['port'], database=dbName)
    return poolStore[dbName]


def doProcess():
    dbName = 'appEntry'
    connection, cursor, _ = getConnectionCursor(dbName)
    sqlString = allSqls['get-generated-id']
    # sqlString1 = allSqls['update-last-id1']
    idGeneratorTableName = "IdGeneratorTable"
    
    dictObj = {
       'idGeneratorTableName':AsIs(f'"{idGeneratorTableName}"'),
       'tableName': 'ClientM'
    }
    try:
        ret = cursor.mogrify(sqlString, dictObj)
        print(ret)

        # ret1 = cursor.mogrify(sql.SQL(sqlString1).format(table=sql.Identifier('LastIdCounter')), [lastId])
        # print(ret1)
        # cursor.execute('select * from "ClientM"', {})
        # out = cursor.fetchone()
        # print(out)
    except (Exception) as error:
        if (connection):
            connection.rollback()
    finally:
        if connection:
            cursor.close()
            connection.close()


doProcess()
