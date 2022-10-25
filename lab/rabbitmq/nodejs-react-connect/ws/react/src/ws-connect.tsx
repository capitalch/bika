import { useEffect } from 'react'
import moment from 'moment'
// import WebSocket from 'ws'

function WSConnect() {
    const url = 'ws://ubuntu-rabbit.cloudjiffy.net:11384'
    // const url = 'ws://localhost:3002/ws'

    useEffect(() => {
        let ws = getWS()

        ws.onopen = () => {
            console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} Websocket ws connected`)
        }

        ws.onclose = () => {
            console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} Websocket ws disconnected`)
            
            setTimeout(() => {
                ws = getWS()
            }, 500)
        }

        ws.onerror = () => {
            console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} WS error`)
        }
    }, [])

    return <div>Socket.io connection on port 3002</div>

    function getWS() {
        return new WebSocket(url)
    }
}

export { WSConnect }
