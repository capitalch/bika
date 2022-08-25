from flask import Flask
import logging

logging.basicConfig(filename='record.log')
app = Flask(__name__)
app.logger.setLevel(logging.DEBUG)
app.logger.debug('debug occured')
app.logger.warning('warning occured')
app.logger.error('error occurred')
app.logger.info('info')
print('abcd')
@app.route("/")
def hello():
    return "<p>Hello</p>"