from redirect import Blueprint, demjson, graphql_sync, gql, json, load_schema_from_path, make_executable_schema, ObjectType, PLAYGROUND_HTML, MutationType, QueryType, request
from redirect import jsonify
from .graphql_worker import context_value, doLogin, processGenericUpdate, processGenericView

graphqlMain = Blueprint('graphqlMain', __name__)


@graphqlMain.route('/graphql', methods=['GET'])
def graphql_playground():
    return PLAYGROUND_HTML, 200


@graphqlMain.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value=context_value(request),
        # debug=app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code


# Types of all queries and fields are defined in query.graphql file
type_defs = load_schema_from_path('data_handlers')

query = QueryType()  # or query = ObjectType('Query')
appServerQuery = ObjectType('AppServerQuery')

mutation = MutationType()
appServerMutation = ObjectType('AppServerMutation')

@query.field('appServer')
def resolve_server(*_):
    return {}

@mutation.field('appServer')
def resolve_server(*_):
    return {}

@appServerQuery.field("doLogin")
def resolve_doLogin(parent, info, credentials):
    return doLogin(info, credentials)


@appServerQuery.field("genericView")
def resolve_generic_view(parent, info, value):
    ret = processGenericView(info.context, value)
    return ret


@appServerQuery.field("genericViewTest")
def resolve_people(parent, info):
    return [
        {"id": 1, "firstName": "Sushant", "lastName": "Agrawal", "age": 58},
        {"id": 2, "firstName": "Prashant", "lastName": "Agrawal", "age": 58}
    ]


@appServerMutation.field("genericUpdate")
def resolve_generic_update(parent, info, value):
    ret = processGenericUpdate(info.context, value)
    return (ret)

schema = make_executable_schema(
    type_defs, appServerMutation, appServerQuery, mutation, query,)

# Graphql process
# Step 1: Define all type in file .graphql. load the file using load_schema_from_path
# Step 2: Define types in code
# Step 3: Implement all the fields
# Step 4: create the schema from make_executable_schema
