from ast import Raise
from http.client import HTTPException
from flask import Flask, jsonify
import logging
from werkzeug import exceptions
from kater_classes import GenericException

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

@app.route("/test-error")
def handle_test():
    ex = GenericException(code=1234, name='hjhjj', description='yyiyiuiyu')
    # ex.code=630
    # ex.name='My except'
    # ex.description="my Description"
    raise ex

@app.errorhandler(Exception)
def handle_http_exception(e):
    return jsonify(code=e.code, name=e.name, descr=e.description), e.code

class genericException(Exception):
    code= 530
    name='generic exception'
    description='This is generic exception'