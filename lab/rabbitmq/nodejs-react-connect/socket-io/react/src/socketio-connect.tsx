import { useEffect } from "react"
import io from 'socket.io-client'

function SocketIOConnect() {
    const url = 'http://ubuntu-rabbit.cloudjiffy.net:11382'

    useEffect(() => {
        const socket = io(url, {
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 50,
            transports: ['websocket']
        })
        socket.on('connect', () => {
            console.log('socket.io connected')
        })

        socket.on('disconnect', () => {
            console.log('socket.io disconnected')
        })
    }, [])
    return (<div>
        Socket.io connection on port 3001
    </div>)
}

export { SocketIOConnect }