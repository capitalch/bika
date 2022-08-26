# from http.client import HTTPException
from msilib import schema
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


# @app.route("/graphql", methods=["GET"])
# def graphql_playground():
#     # On GET request serve GraphQL Playground
#     # You don't need to provide Playground if you don't want to
#     # but keep on mind this will not prohibit clients from
#     # exploring your API using desktop GraphQL Playground app.
#     return PLAYGROUND_HTML, 200


@app.route("/graphql", methods=["POST"])
def graphql_server():
    # GraphQL queries are always sent as POST
    data = request.get_json()

    # Note: Passing the request to the context is optional.
    # In Flask, the current request is always accessible as flask.request
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code
