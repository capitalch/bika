from redirect import CORS, exceptions, Flask, GenericException,getSourceComputer, jsonify, logger, render_template
from core.core_routes import coreRoutes
from data_handlers.graphql_main import graphqlMain

app = Flask(__name__,  template_folder="../build")  # React build
CORS(app)

app.register_blueprint(coreRoutes)
app.register_blueprint(graphqlMain)
hostNameAndIP = getSourceComputer()[2] # getting third value from the tuple
logger.info('Started server..')

@app.errorhandler(GenericException)
def handle_generic_exception(e):    
    logger.error(f'Error code:{e.code} - {e.message}, Called from: {hostNameAndIP}')
    return jsonify(code=e.code, name=e.name, message=e.message), e.code

@app.errorhandler(exceptions.HTTPException)
def handle_http_exception(e):
    logger.error(f'Error code:{e.code} - {e.message}, Called from: {hostNameAndIP}')
    return jsonify(code=e.code, name=e.name, message=e.message), e.code

@app.errorhandler(Exception)
def handle_http_exception(e):
    code = getattr(e, 'code', 999)
    name = getattr(e, 'name', 'unknown')
    message = getattr(e, 'message', 'There was unknown error at server')
    logger.error(f'Error code:{code} - {message}, Called from: {hostNameAndIP}')
    return jsonify(code=code, name=name, message=message), 500


