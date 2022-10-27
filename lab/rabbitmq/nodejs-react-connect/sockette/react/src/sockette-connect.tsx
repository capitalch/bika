import { useEffect } from 'react'
import moment from 'moment'
import Sockette from 'sockette'

function SocketteConnect() {
    const url = 'ws://ubuntu-rabbit.cloudjiffy.net:11384'
    // const url = 'ws://localhost:3002/ws'

    useEffect(() => {
        let ws = getWS()

        // ws.onopen = () => {
        //     console.log(
        //         `${moment().format(
        //             'YYYY-MM-DD HH:mm:ss'
        //         )} Websocket ws connected`
        //     )
        // }

        // ws.onclose = () => {
        //     console.log(
        //         `${moment().format(
        //             'YYYY-MM-DD HH:mm:ss'
        //         )} Websocket ws disconnected`
        //     )

        //     setTimeout(() => {
        //         ws = getWS()
        //     }, 500)
        // }

        // ws.onerror = () => {
        //     console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} WS error`)
        // }
    }, [])

    return <div>Sockette connection on port 3002</div>

    function getWS() {
        // return new WebSocket(url)
        return new Sockette(url, {
            timeout: 5e3,
            maxAttempts: 10,
            onopen: (e) => console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} Connected Sockette`,e),
            onmessage: (e) => console.log(`Received:`,e),
            onreconnect: (e) => console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} Reconnecting...`),
            onmaximum: (e) => console.log('Stop Attempting!', e),
            onclose: (e) => console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} Closed!`),
            onerror: (e) => console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} Error`,e),
        })
    }
}

export { SocketteConnect }
