import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink,
} from '@apollo/client'
import { appMainHookState, urlJoin, useHookstate, } from '../misc/redirect'

function useAppGraphql() {
    const appMainGlobalState = useHookstate(appMainHookState)
    function getClient() {
        const token = appMainGlobalState.appUser.token.get()
        const url: any =
            (process.env.NODE_ENV === 'development')
                ? process.env.REACT_APP_LOCAL_SERVER_URL
                : window.location.href

        const link = new HttpLink({
            uri: urlJoin(url, 'graphql')
        })

        const authLink = new ApolloLink((operation: any, forward: any) => {
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

    async function queryGraphql(q: any) {
        const client = getClient()
        let ret: any
        ret = await client.query({
            query: q,
        })
        return ret
    }

    return { queryGraphql, getClient }
}
export { useAppGraphql }
