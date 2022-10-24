const express = require('express')
const socket = require('socket.io')

const port = 3001
const app = express()

const server = app.listen(port, () => {
    console.log('Listening on port 3001')
})

app.get('/', (req, res) => {
    res.send('node server with socket-io')
})

const io = socket(server)
io.on('connection', socket => {
    'socket connected'
})

//http://adilapapaya.com/docs/ws/