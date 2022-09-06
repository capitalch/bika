from redirect import Blueprint,GenericException, render_template

coreRoutes = Blueprint('core_routes',__name__)

@coreRoutes.route('/')
def index():
    try:
        return render_template('index.html') # React client
    except(Exception):
        raise GenericException(1001, 'fileNotFound', 'index.html file not found')

@coreRoutes.route('/test')
def test():
    return "<p>Test ok</p>"