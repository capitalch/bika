import simplejson as json
from ariadne import graphql_sync, ObjectType, QueryType, gql, make_executable_schema, load_schema_from_path
from ariadne.constants import PLAYGROUND_HTML
from flask import Blueprint,  Flask, jsonify, render_template, request
from flask_cors import CORS
from werkzeug import exceptions
from datetime import datetime
from urllib.parse import unquote
import demjson3 as demjson

from core.logger import logger

from core.generic_classes import GenericException

from core.utils import getSourceComputer
from core.generic_classes import GenericException
from core.messages import messages
