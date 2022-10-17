import pika

connection = pika.BlockingConnection(pika.ConnectionParameters(host='queue.cloudjiffy.net',  credentials=pika.PlainCredentials('guest','guest')))
channel = connection.channel()

channel.queue_declare(
    queue='hello'
)

channel.basic_publish(exchange='', routing_key='hello', body='Hello World')

print('Sent "Hello World"')
connection.close()