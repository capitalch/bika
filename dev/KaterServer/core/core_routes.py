from redirect import Blueprint, render_template

coreRoutes = Blueprint('core_routes',__name__)

@coreRoutes.route('/')
def index():
    return render_template('index.html') # React client

@coreRoutes.route('/test')
def test():
    return "<p>Test ok</p>"