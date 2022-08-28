from flask import Blueprint,  Flask, jsonify, render_template
from flask_cors import CORS
from werkzeug import exceptions
from datetime import datetime

from core.logger import logger
