from ariadne import graphql_sync, ObjectType, QueryType, gql, make_executable_schema, load_schema_from_path
from ariadne.asgi import GraphQL
from flask import Blueprint, jsonify, request
from ariadne.constants import PLAYGROUND_HTML

graphQlArtifacts = Blueprint('graphQlArtifacts', __name__)


@graphQlArtifacts.route('/graphql', methods=['GET'])
def graphql_playground():
    return PLAYGROUND_HTML, 200


@graphQlArtifacts.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()

    # Note: Passing the request to the context is optional.
    # In Flask, the current request is always accessible as flask.request
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        # debug=app.debug
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code


# type_defs = gql("""
#     type Query {
#         kater: KaterQuery
#     }
#     type KaterQuery {
#         genericView: Generic
#     }
#     scalar Generic
# """)

type_defs = load_schema_from_path('graphql_container')

query = QueryType()


@query.field('kater')
def resolve_kater(*_):
    return {}


katerQuery = ObjectType('KaterQuery')  # QueryType()


@katerQuery.field("genericView")
def resolve_people(*_):
    return [
        {"firstName": "Sushant", "lastName": "Agrawal", "age": 58},
        {"firstName": "Prashant", "lastName": "Agrawal", "age": 58}
    ]

schema = make_executable_schema(type_defs,katerQuery, query)  # person)
