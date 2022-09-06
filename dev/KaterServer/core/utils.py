import ipaddress
import socket 
def getSourceComputer():
    hostName=socket.gethostname()   
    ipAddress=socket.gethostbyname(hostName)
    return hostName, ipaddress, f'hostName:{hostName}, IP address:{ipAddress}'