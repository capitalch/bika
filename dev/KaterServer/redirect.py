# from data_handlers.postgres import execSql
from data_handlers.sql import allSqls
from psycopg2.extras import RealDictCursor
import psycopg2
import bcrypt
import jwt
import simplejson as json
from ariadne import graphql_sync, ObjectType, MutationType, QueryType, gql, make_executable_schema, load_schema_from_path
from ariadne.constants import PLAYGROUND_HTML
from flask import Blueprint,  Flask, jsonify, render_template, request
from flask_cors import CORS
from werkzeug import exceptions
from datetime import datetime
from urllib.parse import unquote
import demjson3 as demjson

from core.logger import logger

from core.generic_classes import GenericException

from core.utils import cryptoDecrypt, getSchemaSearchPath, getSourceComputer
from core.generic_classes import GenericException
from core.messages import messages
import base64
import datetime
from datetime import timezone

config = None
with open('config.json') as f:
    config = json.load(f)
entryDb = config.get('authentication').get('entryDb')
# dbName = config['baseConnection']['database']
global_settings = {
    # 'authDbName': ''
}