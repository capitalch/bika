import { useEffect } from "react"
import io from 'socket.io-client'
import moment from 'moment'

function SocketIOConnect() {
    const url = 'http://ubuntu-rabbit.cloudjiffy.net:11382'

    useEffect(() => {
        const socket = io(url, {
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 50,
            transports: ['websocket'],
            
        })
        socket.on('connect', () => {
            console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} socket.io connected`)
        })

        socket.on('disconnect', () => {
            console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} socket.io disconnected`)
        })
    }, [])
    return (<div>
        Socket.io connection on port 3001
    </div>)
}

export { SocketIOConnect }