from redirect import CORS, exceptions, Flask, GenericException,getSourceComputer, jsonify, logger, render_template
from core.core_routes import coreRoutes
from graphql_main.graphql_main import graphqlMain

app = Flask(__name__,  template_folder="../build")  # React build
CORS(app)

app.register_blueprint(coreRoutes)
app.register_blueprint(graphqlMain)
hostNameAndIP = getSourceComputer()[2] # getting third value from the tuple
logger.info('Started main..')

@app.errorhandler(GenericException)
def handle_generic_exception(e):    
    logger.error(f'Error code:{e.code} - {e.description}, Called from: {hostNameAndIP}')
    return jsonify(code=e.code, name=e.name, description=e.description), 500

@app.errorhandler(exceptions.HTTPException)
def handle_http_exception(e):
    logger.error(f'Error code:{e.code} - {e.description}, Called from: {hostNameAndIP}')
    return jsonify(code=e.code, name=e.name, description=e.description), e.code

@app.errorhandler(Exception)
def handle_http_exception(e):
    logger.error(f'Error code:{e.code} - {e.description}, Called from: {hostNameAndIP}')
    return jsonify(code=e.code, name=e.name, description=e.description), e.code


