from redirect import CORS, exceptions, Flask, jsonify, logger
from core.core_routes import coreRoutes

app = Flask(__name__,  template_folder="../build")
CORS(app)

app.register_blueprint(coreRoutes)

logger.info('Started main..')


@app.errorhandler(exceptions.HTTPException)
def handle_http_exception(e):
    return jsonify(code=e.code, name=e.name, descr=e.description), e.code


@app.errorhandler(Exception)
def handle_http_exception(e):
    return jsonify(code=e.code, name=e.name, descr=e.description), e.code
