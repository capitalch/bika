const WebSocket = require('ws');
const express = require('express')
const http = require('http')
const port = 3002
const app = express()

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws)=>{
    console.log('Websocket ws connected')
})
server.listen(port, () => {
    console.log('Listening on port 3002')
})

app.get('/', (req, res) => {
    res.send('node server with ws at port 3002')
})
