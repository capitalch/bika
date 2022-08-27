from flask import Blueprint, Flask, jsonify, request, render_template
import sys
from flask_cors import CORS
import logging
from werkzeug import exceptions
from routes.main_routes import main_routes
from datetime import datetime

app = Flask(__name__,  template_folder="../build")
CORS(app)
print('kater-server starting...')

app.register_blueprint(main_routes)

# Logging levels are Debug:10, Info: 20, Warning: 30, Error: 40, Critical: 50
currentMonth = datetime.now().strftime("%b")
currentYear = datetime.now().year
logFormatStr = '%(asctime)s  %(levelname)s - %(message)s'
logging.basicConfig(filename=f'logs/{currentMonth}-{currentYear}.log', format=logFormatStr, level = logging.DEBUG)
# log = app.logger
# formatter = logging.Formatter(fmt="%(asctime)s %(levelname)s %(module)s: %(message)s",
#                           datefmt="%H:%M:%S")
# handler = logging.StreamHandler() #sys.stdout
# handler.setLevel(logging.DEBUG)
# handler.setFormatter(formatter)

# if this is not called, log will output both original and new format
# log.handlers.clear()
# log.addHandler(handler)
# app.logger.setLevel(logging.DEBUG)

logging.info('Logging started')


@app.errorhandler(exceptions.HTTPException)
def handle_http_exception(e):
    return jsonify(code=e.code, name=e.name, descr=e.description), e.code


@app.errorhandler(Exception)
def handle_http_exception(e):
    return jsonify(code=e.code, name=e.name, descr=e.description), e.code
