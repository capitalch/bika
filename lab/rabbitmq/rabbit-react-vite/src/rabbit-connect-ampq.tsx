import client, { Connection, Channel } from 'amqplib'

function RabbitConnectAmpq() {
    return (
        <div style={{ margin: 10 }}>
            <button onClick={doConnectAndSend}>
                Connect to rabbitMQ and send message
            </button>
        </div>
    )

    async function doConnectAndSend() {
        const connection: Connection = await client.connect(
            'amqp://guest1:guest1@ubuntu-rabbit.cloudjiffy.net:11379'
        )

        // Create a channel
        const channel: Channel = await connection.createChannel()
        // Makes the queue available to the client
        await channel.assertQueue('hello')
        //Send a message to the queue
        channel.sendToQueue('hello', Buffer.from('Hello from react'))
    }
}
export { RabbitConnectAmpq }
