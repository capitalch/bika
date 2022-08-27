from flask import Blueprint, jsonify, request,render_template

main_routes = Blueprint('main_routes',__name__)

@main_routes.route('/')
def index():
    return render_template('index.html')

@main_routes.route('/test')
def test():
    return "<p>Test ok</p>"