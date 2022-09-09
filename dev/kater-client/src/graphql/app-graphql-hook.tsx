import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink,
} from '@apollo/client'
import { servicesVersion } from 'typescript'
import { appHookState, messages, urlJoin, useHookstate, } from '../misc/redirect'

function useAppGraphql() {
    const appGlobalState = useHookstate(appHookState)
    function getClient() {
        const token = appGlobalState.appUser.token.get()
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
        try {
            ret = await client.query({
                query: q,
            })
        } catch (error: any) {
            const serverErrorMessage = error?.networkError?.result?.message
            const mess = serverErrorMessage || messages.errFetch
            appGlobalState.errorMessage.merge({ show: true, message: mess })
            console.log(error)
        }
        return ret
    }

    function objectToStringEncoded(obj: any) {

    }

    return { queryGraphql }
}
export { useAppGraphql }
