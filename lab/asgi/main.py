from quart import Quart
# from redirect import CORS
from data_handlers.graphql_main import graphqlMain

app = Quart(__name__)
app.register_blueprint(graphqlMain)

@app.route('/')
async def hello():
    return('Hello World')
