# from redirect import Blueprint, demjson, graphql_sync, gql, json, load_schema_from_path, make_executable_schema, ObjectType, PLAYGROUND_HTML, MutationType, QueryType, request
# from redirect import jsonify
# from .graphql_worker import context_value, doLogin, processGenericUpdate, processGenericView

from ariadne import graphql, QueryType, make_executable_schema, SubscriptionType, MutationType, make_executable_schema, load_schema_from_path, graphql_sync, ObjectType
from ariadne.constants import PLAYGROUND_HTML
from quart import Blueprint, Quart, request, jsonify
from ariadne.asgi import GraphQL

graphqlMain = Blueprint('graphqlMain', __name__)

# type_defs = """
#     type Query {
#         hello: String!
#     }
# """

query = QueryType()

# # resolver for the field 'hello'
@query.field("hello")
async def resolve_hello(_, info) -> str:
    request = info.context
    user_agent = request.headers.get("User-Agent", "Guest")
    return "Hello, %s!" % user_agent

# schema = make_executable_schema(type_defs, query) # kind of magical


# @graphqlMain.route("/", methods=["GET"])
# async def index() -> str: # just here to confirm quart is running
#     return "Hello, Ariadne"

# @graphqlMain.route("/graphql", methods=["GET"])
# async def graphql_playgroud() -> str: # supplies playground environment
#     return PLAYGROUND_HTML, 200

# @graphqlMain.route("/graphql", methods=["POST"])
# async def graphql_server() -> str:
#     data = await request.get_json()
#     success, result = await graphql( # this is the async interface, flask uses sync_graphql
#         schema,
#         data,
#         context_value=request,
#         # debug=app.debug
#     )
#     return jsonify(result), 200 if success else 400


@graphqlMain.route('/graphql', methods=['GET'])
async def graphql_playground():
    return PLAYGROUND_HTML, 200


@graphqlMain.route("/graphql", methods=["POST"])
async def graphql_server():
    data = await request.get_json()
    success, result = await graphql(
        schema,
        data,
        context_value=request,
        # debug=app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code

# def context_value(request):
#     pass

# Types of all queries and fields are defined in query.graphql file
type_defs = load_schema_from_path('data_handlers')

# query = QueryType()  # or query = ObjectType('Query')
appServerQuery = ObjectType('AppServerQuery')

mutation = MutationType()
appServerMutation = ObjectType('AppServerMutation')

@query.field('appServer')
async def resolve_server(*_):
    return {}

@mutation.field('appServer')
async def resolve_server(*_):
    return {}

@appServerQuery.field("genericViewTest")
async def resolve_people(parent, info):
    return [
        {"id": 1, "firstName": "Sushant", "lastName": "Agrawal", "age": 58},
        {"id": 2, "firstName": "Prashant", "lastName": "Agrawal", "age": 58}
    ]


# @appServerMutation.field("genericUpdate")
# async def resolve_generic_update(parent, info, value):
#     ret = 'OK' #processGenericUpdate(info.context, value)
#     return (ret)

schema = make_executable_schema(
    type_defs, appServerMutation, appServerQuery, mutation, query,)