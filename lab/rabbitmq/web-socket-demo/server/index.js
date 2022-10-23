const webSocket = require('websocket')
const http = require('http')

const webSocketServer = webSocket.server
const server = http.createServer()
webSocketServerPort = 8000
server.listen(webSocketServerPort)
const wsServer = new webSocketServer({
    httpServer: server
})

const clients = {}
const getUniqueID = () => {
    const s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    return s4() + s4() + '-' + s4()
}

wsServer.on('request', request => {
    const userId = getUniqueID()
    console.log(
        new Date() +
            ' Recieved a new connection from origin ' +
            request.origin +
            '.'
    )
    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin)
    clients[userId] = connection
    console.log('connected: ' + userId)
})

wsServer.on('connect', (ws)=>{
    ws.send('welcome to chat')
    ws.on('message',(data)=>{
        console.log(data)
    })
})
