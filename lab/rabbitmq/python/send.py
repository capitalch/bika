from logging import root
import pika
import os

connection = pika.BlockingConnection(pika.ConnectionParameters(host='trace-link.cloudjiffy.net', port='11362',  credentials=pika.PlainCredentials('guest1','guest1')  )) # works

#url = os.environ.get('amqps://rfnortyg:PVWhYAeWfb8kMPR2m38g2NycelEHftSO@rattlesnake.rmq.cloudamqp.com/rfnortyg', 'amqp://guest:guest@localhost:5672/%2f')
#params = pika.URLParameters(url)
#connection = pika.BlockingConnection(params) #works

channel = connection.channel()

channel.queue_declare(
    queue='test',
    durable=True,
)

channel.basic_publish(exchange='', routing_key='test', body='Hello World')

print('Sent "Hello World"')
connection.close()

#For queue RabbitMQ docker
# uid: root
# pwd: 'Pu6x1SLDsj'