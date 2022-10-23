const amqp = require('amqplib/callback_api')
// url format is amqp://uid:pwd@host:port
amqp.connect('amqp://guest1:guest1@ubuntu-rabbit.cloudjiffy.net:11379', function (error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1
        }
        var queue = 'hello'
        var msg = 'Hello world'
        msg = JSON.stringify({a:1,b:2})

        channel.assertQueue(queue, {
            durable: false
        })

        channel.sendToQueue(queue, Buffer.from(msg))
        console.log(' [x] Sent %s', msg)
    })
})

setTimeout(function () {
    connection.close()
    process.exit(0)
}, 10000)
