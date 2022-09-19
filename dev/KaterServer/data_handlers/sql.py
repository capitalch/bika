allSqls = {
    "get-states": '''
        select * from "StateM"
    ''',

    "get-clients":'''
        select * from "ClientM"
    ''',

    "get-clients1":'''
        select * from "ClientM" where "shortCode" = 'bikafoods'
    '''
}
