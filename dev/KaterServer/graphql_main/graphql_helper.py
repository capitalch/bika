# from redirect import request
from redirect import messages

from redirect import GenericException


def context_value(request):
    auth = request.headers.get('AUTHORIZATION')
    if ((auth is None) or (auth == '')):
        raise GenericException(code=messages['errMissingToken'][0], name='errMissingToken', message=messages['errMissingToken'][1])
    operationName = request.json.get('operationName', None)
    if (operationName == 'login'):
        return
