from asyncio.log import logger
from redirect import allSqls, base64, bcrypt, config, cryptoDecrypt, datetime, GenericException, jwt, messages, timezone, unquote
from data_handlers.postgres import execSql


def context_value(request):
    operationName = request.json.get('operationName', None)
    auth = request.headers.get('AUTHORIZATION')
    if ((auth is None) or (auth == '')):
        raiseGenericException('errMissingToken')
    elif (operationName is None):
        raiseGenericException('errOperationMissing')
    elif (operationName == 'login'):
        diff = getClientServerTimeDiff(auth)
        if (diff > 1):
            raiseGenericException('errTimeDiff')
    else:  # process token
        processToken(auth)


def getClientServerTimeDiff(auth):
    try:
        token = auth.split(' ')[-1]
        decrypted = cryptoDecrypt(token)
        client_timestamp = float(decrypted)/1000
        dt = datetime.datetime.now(timezone.utc)
        utc_time = dt.replace(tzinfo=timezone.utc)
        server_timestamp = utc_time.timestamp()
        diff = server_timestamp - client_timestamp
        return diff
    except:
        raiseGenericException('errToken')


def doLogin(credentials):

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

    def getToken(payload):
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
        token = getToken({"a": "b"})
    # ret = execSql(allSqls['get-states'], schema='demo')
        return {
            'isSuccess': True,
            'userType': 'S',
            'token': token}
    else:
        return {
            'isSuccess': False
        }


def processToken(auth):
    try:
        token = auth.split(' ')[-1]  # get last word
        secret = config.get('authentication').get('jwt').get('secret')
        algorithm = config.get('authentication').get('jwt').get('algorithm')
        payload = jwt.decode(token, secret, algorithm)
        print(payload)
    except jwt.ExpiredSignatureError as error1:
        logger.error(error1)
        raiseGenericException('errTokenExpired')
    except (Exception) as error:
        logger.error(error)
        raiseGenericException('errInvalidToken')


def raiseGenericException(errName):
    raise GenericException(
        code=messages[errName][0], name=errName, message=messages[errName][1])
