from flask import Blueprint, Flask, jsonify, request
from werkzeug import exceptions

app = Flask(__name__)
print('kater-server starting...')

@app.route("/")
def hello():
    return "<p>Hello</p>"

@app.errorhandler(exceptions.HTTPException)
def handle_http_exception(e):
    return jsonify(code=e.code, name=e.name, descr=e.description), e.code


@app.errorhandler(Exception)
def handle_http_exception(e):
    return jsonify(code=e.code, name=e.name, descr=e.description), e.code