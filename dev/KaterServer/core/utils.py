import ipaddress
import socket
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import base64
from core.generic_classes import GenericException
from core import messages

def cryptoDecrypt(encrypted):
    key = '0123456789123456'
    enc = base64.b64decode(encrypted)
    cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB,)
    decr = unpad(cipher.decrypt(enc),16)
    return decr.decode('utf-8', errors='ignore')

def getSchemaSearchPath(schema):
    searchPathSql = '' if schema == 'public' else f'set search_path to {schema}'
    return searchPathSql

def getSourceComputer():
    hostName=socket.gethostname()   
    ipAddress=socket.gethostbyname(hostName)
    return hostName, ipaddress, f'hostName:{hostName}, IP address:{ipAddress}'