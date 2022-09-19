import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink,
} from '@apollo/client'
import {  globalStore, messages, urlJoin, } from '../misc/redirect'
import _ from 'lodash'

function useAppGraphql() {
    function getClient() {
        const token = globalStore.loginInfo.token
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
            if (error?.networkError?.statusCode === 1007) { //Token expired so reset
                globalStore.loginInfo = { isLoggedIn: false, token: '', userType: '', uid: '' }
            }
            error.message = error?.networkError?.result?.message || error.message || messages.errFetch
            globalStore.errorMessage =  { show: true, message: error.message }
            console.log(error)
            throw (error)
        }
        return ret
    }

    return { queryGraphql, }
}
export { useAppGraphql }
