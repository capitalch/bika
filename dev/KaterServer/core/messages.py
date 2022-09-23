messages = {
    'errMissingToken': (1001, 'Authentication token is missing from client request'),
    'errOperationMissing': (1002, 'A GraphQL query must contain query name, which is missing'),
    'errToken': (1003, 'Authentication token error'),
    'errTimeDiff': (1004, 'The time difference between client and server is too high'),
    'errDbCusorFetchError': (1005, 'Error while fetching rows from database cursor'),
    'errSqlExecError': (1006, 'Error executing sql statement at server'),
    'errTokenExpired': (1007, 'Authentication token is expired. Please login'),
    'errInvalidToken': (1008, 'Authentication failure. Invalid token'),

    'errNoSqlKeyProvided': (1009, "No sql key is provided with query"),
    'errNoSqlStringForSqlKey':(1010, "There is no sql string available against sql key"),
    'errProcessGenericView': (lambda mess: (1011, f"Could not process generic view: {mess}")),
    'errProcessGenericUpdate': (lambda mess: (1012, f"Could not process generic update: {mess}")),
}

