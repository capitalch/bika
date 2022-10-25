const WebSocket = require('ws');

const port = 3010

const express = require('express')
const app = express()

const server = app.listen(port, () => {
    console.log('Listening on port 3002')
})

app.get('/', (req, res) => {
    res.send('node server with ws at port 3002')
})

const wss = new WebSocket.Server({ port:3002 });
// const wss = new WebSocket(server)

wss.on('connection', (ws)=>{
    console.log('Websocket ws connected')
})