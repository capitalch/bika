allSqls = {
    "get-states": '''
        select * from "StateM"
    ''',

    "get-clients":'''
        select * from "ClientM"
    ''',

    "get-clients1":'''
        select * from "ClientM" where "shortCode" = 'bikafoods'
    ''',

    "get-generated-id":'''
       insert into %(idGeneratorTableName)s ("tableName", "lastId")
            select %(tableName)s as "tableName", 0 as "lastId"
                where not exists(select 1 from %(idGeneratorTableName)s where "tableName" = %(tableName)s);
            select "lastId" + 1 as "id" from %(idGeneratorTableName)s
                where "tableName" = %(tableName)s;
    ''',

    'update-last-id':'''
        update %(idGeneratorTableName)s
            set "lastId" = %(lastId)s
                where "tableName" = %(tableName)s
    '''
}

# --LOCK TABLE "IdGeneratorTable" IN ACCESS EXCLUSIVE MODE;