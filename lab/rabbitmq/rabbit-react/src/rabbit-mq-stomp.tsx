import { Client } from '@stomp/stompjs'
import { IncomingMessage } from 'http'
import { useEffect, useRef } from 'react'

function RabbitStomp() {
    let client: any = useRef(undefined)

    useEffect(() => {
        if(!client.current){
            client.current = new Client({
                brokerURL: 'ws://ubuntu-rabbit.cloudjiffy.net:11373/ws',
                connectHeaders: {
                    login: 'guest1',
                    passcode: 'guest1'
                },
                // debug: (str: string) => console.log(str),
                // heartbeatIncoming: 0,
                // heartbeatOutgoing: 0,
                reconnectDelay: 5000,
            })
        }
        client.current.onConnect = (frame: any) => {
            // client.current.subscribe('/queue/test', (message: any) => { console.log(message) })
            console.log('connected')
        }
        client.current.activate()
    }, [])

    return (<div style={{ margin: 10 }}>
        <button onClick={connectAndSend}>Connect and send message STOMP</button>
    </div>)

    function connectAndSend() {

        client.current.publish({
            destination: '/queue/test',
            body: 'Hello from React'
        })



    }

    // async function connectAndSend() {
    //     const ws = new WebSocket('ws://ubuntu-rabbit.cloudjiffy.net:11373/ws')
    //     const headers = {
    //         'login': 'guest1',
    //         'passcode': 'guest1',
    //         'durable': 'true',
    //         'auto-delete': 'false',
    //         'host': '/'
    //     }
    //     const stompClient = stomp.over(ws)
    //     stompClient.debug = (mess: any) => {
    //         console.log(mess)
    //     }

    //     stompClient.connect(headers, function (frame: any) {
    //         console.log('connected1')
    //         stompClient.send('/queue/hello', {}, 'test')
    //     })

    // }
}

export { RabbitStomp }