from redirect import CORS, exceptions, Flask, jsonify, logger
from core.core_routes import coreRoutes
from graphql_main.graphql_setup import graphqlSetup

app = Flask(__name__,  template_folder="../build")
CORS(app)

app.register_blueprint(coreRoutes)
app.register_blueprint(graphqlSetup)

logger.info('Started main..')


@app.errorhandler(exceptions.HTTPException)
def handle_http_exception(e):
    return jsonify(code=e.code, name=e.name, descr=e.description), e.code


@app.errorhandler(Exception)
def handle_http_exception(e):
    return jsonify(code=e.code, name=e.name, descr=e.description), e.code
