import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink,
} from '@apollo/client'
import { urlJoin, } from './redirect'

function graphqlService() {

    function getClient(token: string) {
        const url: any =
            (process.env.NODE_ENV === 'development')
                ? process.env.REACT_APP_LOCAL_SERVER_URL
                : window.location.href

        const link = new HttpLink({
            uri: urlJoin(url, 'graphql')
        })

        const authLink = new ApolloLink((operation:any,forward:any)=>{
            operation.setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : '',
                },
            })
            return forward(operation)
        })

        const client = new ApolloClient({
            cache: new InMemoryCache(),
            link: authLink.concat(link),
            defaultOptions: {
                query: {
                    fetchPolicy: 'network-only',
                },
            },
        })
        return client
    }

    async function queryGraphql(token: string, q: any) {
        const client = getClient(token)
        let ret: any
        try {
            ret = await client.query({
                query: q,
            })
        } catch (error: any) {
            console.log(error)
        }
        return ret
    }

    return { queryGraphql }
}
export { graphqlService }
