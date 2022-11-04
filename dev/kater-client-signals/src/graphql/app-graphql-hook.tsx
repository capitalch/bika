import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink,
    split,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { globalStore, messages, showErrorMessage, urlJoin } from '../common/misc/redirect'

function useAppGraphql() {
    function getClient() {
        const token = globalStore.loginInfo.token.value
        const url: any =
            process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_LOCAL_SERVER_URL
                : window.location.href

        const link = new HttpLink({
            uri: urlJoin(url, 'graphql'),
        })

        const authLink = new ApolloLink((operation: any, forward: any) => {
            operation.setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : '',
                },
            })
            return forward(operation)
        })

        // const wsLink = new GraphQLWsLink(createClient({
        //     url: urlJoin(url, 'graphql')
        // }))

        // const splitLink = split(({ query }) => {
        //     const definition = getMainDefinition(query)
        //     return (
        //         definition.kind === 'OperationDefinition' &&
        //         definition.operation === 'subscription'
        //     )
        // }, wsLink, authLink.concat(link))

        const client = new ApolloClient({
            cache: new InMemoryCache(),
            // link: splitLink, //authLink.concat(link)
            defaultOptions: {
                query: {
                    fetchPolicy: 'network-only',
                },
            },
        })
        return client
    }

    function handleError(error: any) {
        if (error?.networkError?.statusCode === 1007) {
            globalStore.value.resetLoginInfo()
        }
        error.message =
            error?.networkError?.result?.message ||
            error.message ||
            messages.errFetch
        showErrorMessage({ message: error.message })
        console.log(error)
        throw error
    }

    async function mutateGraphql(q: any) {
        const client = getClient()
        let ret: any
        try {
            ret = await client.mutate({
                mutation: q,
            })
        } catch (error: any) {
            handleError(error)
        }
        return ret
    }

    async function queryGraphql(q: any) {
        const client = getClient()
        let ret: any
        try {
            ret = await client.query({
                query: q,
            })
        } catch (error: any) {
            handleError(error)
        }
        return ret
    }

    return { mutateGraphql, queryGraphql }
}
export { useAppGraphql }
