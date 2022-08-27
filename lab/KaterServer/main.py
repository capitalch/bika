from flask import Blueprint, Flask, jsonify, request
import logging
from werkzeug import exceptions
from kater_classes import GenericException
from ariadne.constants import PLAYGROUND_HTML
from ariadne import QueryType, graphql_sync, make_executable_schema
from graphql_container.graphql_artifacts import schema, graphQlArtifacts

logging.basicConfig(filename='record.log')
app = Flask(__name__)
app.logger.setLevel(logging.DEBUG)
app.logger.debug('debug occured')
app.logger.warning('warning occured')
app.logger.error('error occurred')
app.logger.info('info')

print('abcd')
app.register_blueprint(graphQlArtifacts)


@app.route("/")
def hello():
    return "<p>Hello</p>"


@app.route("/test-error")
def handle_test():
    ex = GenericException(code=1234, name='hjhjj', description='yyiyiuiyu')
    raise ex


@app.errorhandler(exceptions.HTTPException)
def handle_http_exception(e):
    return jsonify(code=e.code, name=e.name, descr=e.description), e.code


@app.errorhandler(Exception)
def handle_http_exception(e):
    return jsonify(code=e.code, name=e.name, descr=e.description), e.code


