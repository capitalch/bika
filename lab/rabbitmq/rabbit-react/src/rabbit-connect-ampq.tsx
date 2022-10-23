// import client, { Connection, Channel } from 'amqplib'
// import {Buffer} from 'buffer'

function RabbitConnectAmpq() {

    return (<div style={{ margin: 10 }}>
        <button onClick={doConnectAndSend}>Connect to rabbitMQ and send message</button>
    </div>)

    async function doConnectAndSend() {
        // const connection: Connection = await client.connect(
        //     'amqp://guest1:guest1@ubuntu-rabbit.cloudjiffy.net:11379'
        // )

        // // Create a channel
        // const channel: Channel = await connection.createChannel()
        // // Makes the queue available to the client
        // await channel.assertQueue('myQueue')
        // //Send a message to the queue
        // channel.sendToQueue('hello', Buffer.from('Hello from react'))
        // amqp.connect('amqp://guest1:guest1@ubuntu-rabbit.cloudjiffy.net:11379', function (error0, connection) {
        //     if (error0) {
        //         throw error0
        //     }
        //     connection.createChannel(function (error1, channel) {
        //         if (error1) {
        //             throw error1
        //         }
        //         var queue = 'hello'
        //         var msg = 'Hello world'
        //         msg = JSON.stringify({ a: 1, b: 2 })

        //         channel.assertQueue(queue, {
        //             durable: false
        //         })

        //         channel.sendToQueue(queue, Buffer.from(msg))
        //         console.log(' [x] Sent %s', msg)
        //     })
        // })
    }

}

export { RabbitConnectAmpq }