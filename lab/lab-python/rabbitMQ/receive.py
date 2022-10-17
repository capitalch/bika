import pika, sys, os

def main():
    # connection = pika.BlockingConnection(pika.ConnectionParameters(host='queue.cloudjiffy.net',  credentials=pika.PlainCredentials('guest','guest')))
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='103.217.220.30',  credentials=pika.PlainCredentials('guest','guest')))
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