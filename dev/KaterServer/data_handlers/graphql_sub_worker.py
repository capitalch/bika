from redirect import config, cryptoDecrypt, datetime,  GenericException,jwt, logger, messages, timezone

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

def validateTokenAndGetPayload(auth):
    try:
        token = auth.split(' ')[-1]  # get last word
        secret = config.get('authentication').get('jwt').get('secret')
        algorithm = config.get('authentication').get('jwt').get('algorithm')
        payload = jwt.decode(token, secret, algorithm)
        print(payload)
        return payload
        
    except jwt.ExpiredSignatureError as error1:
        logger.error(error1)
        raiseGenericException('errTokenExpired')
    except (Exception) as error:
        logger.error(error)
        raiseGenericException('errInvalidToken')

def raiseGenericException(errName):
    raise GenericException(
        code=messages[errName][0], name=errName, message=messages[errName][1])

def raiseGenericExceptionFn(errName, mess):
    raise GenericException(
            code= messages[errName](mess)[0], name = errName, message= messages[errName](mess)[1]
        )