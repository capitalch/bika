import { useEffect, useRef } from 'react'
import mqtt from 'paho-mqtt'

function RabbitMqtt() {
    // let client = useRef()
    // const cl = new mqtt.Client()
    
    useEffect(() => {
        const websocketUrl = 'ws://ubuntu-rabbit.cloudjiffy.net:11373/ws'
        try {
            
            // mqtt.Client..connect({
            //     host: 'ubuntu-rabbit.cloudjiffy.net:11373',
            //     username: 'guest1',
            //     password: 'guest1',
            //     port: 11373,
            // })
        } catch (e: any) {
            console.log(e)
        }
    }, [])

    return (<div style={{ margin: 10 }}>
        <button onClick={send}>Connect and send message STOMP</button>
    </div>)

    function send(){

    }
}

export { RabbitMqtt }
