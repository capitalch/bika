import pika, sys, os

def main():
    # connection = pika.BlockingConnection(pika.ConnectionParameters(host='queue.cloudjiffy.net',  credentials=pika.PlainCredentials('guest','guest')))
    # Following works. I changed default user/ pwd to guest1/guest1
    # connection = pika.BlockingConnection(pika.ConnectionParameters(host='queue.cloudjiffy.net', port='11374',  credentials=pika.PlainCredentials('guest1','guest1')))
    # url = os.environ.get('amqps://rfnortyg:PVWhYAeWfb8kMPR2m38g2NycelEHftSO@rattlesnake.rmq.cloudamqp.com/rfnortyg', 'amqp://guest:guest@localhost:5672/%2f') # works
    # params = pika.URLParameters(url)
    # connection = pika.BlockingConnection(params)

    # connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost', port='5672',  credentials=pika.PlainCredentials('guest','guest')))

    connection = pika.BlockingConnection(pika.ConnectionParameters(host='ubuntu-rabbit.cloudjiffy.net', port='11379', credentials=pika.PlainCredentials('guest1','guest1') )) # not working when rabbitMQ installed on ubuntu

    channel = connection.channel()

    channel.queue_declare(
        queue='hello'
    )

    def callback(ch, method, properties, body):
        print(f'Received {body}')

    channel.basic_consume(queue='hello', auto_ack=True, on_message_callback=callback)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)