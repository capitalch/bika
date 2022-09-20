from redirect import allSqls, base64, bcrypt, config, cryptoDecrypt, datetime, demjson, entryDb, GenericException, jwt, logger, messages, timezone, unquote
from .graphql_sub_worker import getClientServerTimeDiff, raiseGenericException, raiseGenericExceptionFn, validateTokenAndGetPayload
from .postgres import execSql


def context_value(request):
    operationName = request.json.get('operationName', None)
    auth = request.headers.get('AUTHORIZATION')
    if ((auth is None) or (auth == '')):
        raiseGenericException('errMissingToken')
    elif (operationName is None):
        raiseGenericException('errOperationMissing')
    elif (operationName == 'login'):
        diff = getClientServerTimeDiff(auth)
        # return {}
        if (diff > 1):
            raiseGenericException('errTimeDiff')
        else:
            return {}
    else:  # process token
        payload = validateTokenAndGetPayload(auth)
        payload['operationName'] = operationName
        return payload


def doLogin(info, credentials):
    def getBundle(uidOrEmail, pwd):
        bundle = None
        a = config['authentication']['superAdmin']['uid']
        return a

    def isValidPwd(pwd, hsh):
        ret = False
        if pwd is None or hsh is None:
            return ret
        elif bcrypt.checkpw(pwd.encode('utf-8'), hsh.encode('utf-8')):
            ret = True
        return ret

    def createToken(payload):
        secret = config.get('authentication').get('jwt').get('secret')
        algorithm = config.get('authentication').get('jwt').get('algorithm')
        expInWeeks = config.get('authentication').get(
            'jwt').get('expiryInWeeks')
        payload['exp'] = datetime.datetime.now(
            tz=timezone.utc) + datetime.timedelta(weeks=expInWeeks)
        token = jwt.encode(payload, secret, algorithm,)
        return token

    def isSuperAdmin(u, p):
        ret = False
        storedUid = config['authentication']['superAdmin']['uid']
        storedEmail = config['authentication']['superAdmin']['email']
        storedHash = config['authentication']['superAdmin']['hash']
        if (u == storedUid) or (u == storedEmail):
            ret = isValidPwd(p, storedHash)
        return ret

    def getUidOrEmailAndPwd(cred):
        mix = base64.b64decode(cred).decode('utf-8')
        mixArr = mix.split(':')
        uidOrEmail = mixArr[0]
        pwd = mixArr[1]
        return uidOrEmail, pwd

    credentials = unquote(credentials)
    uidOrEmail, pwd = getUidOrEmailAndPwd(credentials)
    
    # c = getBundle(uidOrEmail, pwd)
    if (isSuperAdmin(uidOrEmail, pwd)):
        token = createToken({"userType": "S"})
        info.context['dbName'] = entryDb
        # info.context['dbName'] = 'appEntry'

    # ret = execSql(allSqls['get-states'], schema='demo')
        return {
            'isSuccess': True,
            'userType': 'S',
            'token': token}
    else:
        return {
            'isSuccess': False
        }


def processGenericView(context, value):
    try:
        value = unquote(value)
        valueDict = demjson.decode(value)
        operationName = context['operationName']
        if(operationName == 'appEntry'):
            context['dbName'] = entryDb
        sqlKey = valueDict.get('sqlKey', None)
        if (sqlKey is None):
            raiseGenericException('errNoSqlKeyProvided')
        sqlString = allSqls.get(sqlKey, None)
        if (sqlString is None):
            raiseGenericException('errNoSqlStringForSqlKey')
        args = valueDict.get('args', None)
        return execSql(context['dbName'], sqlString=sqlString, args=args)
        # if (valueDict.get('args') is None):
        #     valueDict['args'] = {}
    except Exception as error:
        raiseGenericExceptionFn('errProcessGenericView', error.message)
