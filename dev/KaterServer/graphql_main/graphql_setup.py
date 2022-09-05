from redirect import Blueprint, graphql_sync, gql, load_schema_from_path, make_executable_schema, ObjectType, PLAYGROUND_HTML, QueryType, request
from redirect import jsonify

graphqlSetup = Blueprint('graphqlSetup', __name__)

@graphqlSetup.route('/graphql', methods=['GET'])
def graphql_playground():
    return PLAYGROUND_HTML, 200


@graphqlSetup.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        # debug=app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code


type_defs = load_schema_from_path('graphql_main') # Types of all queries and fields are defined in query.graphql file

query = QueryType() # or query = ObjectType('Query')
katerQuery = ObjectType('KaterQuery')

@query.field('kater')
def resolve_kater(*_):
    return {}

@katerQuery.field("genericView")
def resolve_people(*_):
    return [

        {"firstName": "Sushant", "lastName": "Agrawal", "age": 58},
        {"firstName": "Prashant", "lastName": "Agrawal", "age": 58}
    ]

schema = make_executable_schema(type_defs,katerQuery, query)

# Graphql process
# Step 1: Define all type in file .graphql. load the file using load_schema_from_path
# Step 2: Define types in code
# Step 3: Implement all the fields
# Step 4: create the schema from make_executable_schema