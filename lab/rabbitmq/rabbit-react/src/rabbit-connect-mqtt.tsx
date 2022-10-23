import mqtt from 'mqtt'
function RabbitConnectMqtt() {
    return (<div style={{ margin: 10 }}>
        <button onClick={connectAndSend}>Connect and send message MQTT</button>
    </div>)

    async function connectAndSend() {
        const url = 'mqtt://guest1:guest1@ubuntu-rabbit.cloudjiffy.net:11379'
        const client = mqtt.connect(url)
        client.on('connect', () => console.log('connected'));
        client.on('message', (topic, payload, packet) => {
            console.log(payload.toString());
        });
    }
}

export { RabbitConnectMqtt }