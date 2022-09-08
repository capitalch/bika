# from redirect import request
def context_value(request):
    if (request.json['operationName'] == 'login'):
        return
