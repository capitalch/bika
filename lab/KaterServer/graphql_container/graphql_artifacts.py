from ariadne import ObjectType, QueryType, gql, make_executable_schema
from ariadne.asgi import GraphQL
from flask import Blueprint
from ariadne.constants import PLAYGROUND_HTML

graphQlArtifacts = Blueprint('graphQlArtifacts',__name__)


@graphQlArtifacts.route('/graphql',methods=['GET'])
def graphql_playground():
     return PLAYGROUND_HTML, 200

type_defs = gql("""
    type Query {
        people:[Person]!
    }

    type Person {
        firstName: String
        lastName: String
        age: Int
        fullName: String
    }
"""
                )

query = QueryType()


@query.field("people")
def resolve_people(*_):
    return [
        {"firstName": "Sushant", "lastName": "Agrawal", "age": 58},
        {"firstName": "Prashant", "lastName": "Agrawal", "age": 58}
    ]
person = ObjectType("Person")
@person.field("fullName")
def resolve_person_full_name(person, *_):
    return f"{person['firstName']} {person['lastName']}"

schema = make_executable_schema(type_defs,query, person)
