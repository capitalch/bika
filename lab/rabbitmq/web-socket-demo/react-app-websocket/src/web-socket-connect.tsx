import { useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

function WebsocketConnect() {
    // const client = new W3CWebSocket('ws://127.0.0.1:8000')

    const client = new WebSocket('ws://127.0.0.1:8000')

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected')
        }

        client.onmessage = (message: any) => {
            console.log(message)
        }
    }, [])

    return (
        <div style={{margin:10}}>
            Practical Intro To WebSockets.
            <button onClick={handleSend}>Send</button>
        </div>
    )

    function handleSend(){
        client.send('Hello from react')
    }
}

export { WebsocketConnect }