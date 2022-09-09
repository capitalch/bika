import {
    appHookState,
    Box,
    CssBaseline,
    useGlobalMediaQuery,
    useEffect,
    useHookstate,
} from '../../misc/redirect'
import { AppClientCentral } from './app-client-central'
import { AppClientHeader } from './app-client-header'
import { AppClientSideBar } from './app-client-side-bar'
import { AppLoadingIndicator } from '../common/app-loading-indicator'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from '@apollo/client'

function AppClient() {
    const appGlobalState = useHookstate(appHookState)
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()

    useEffect(() => {
        //By default if xl size and user already logged in then show side menu
        if (appGlobalState.appUser.isLoggedIn.get())
            appGlobalState.open.set(isExtraLargeSizeUp)
    })

    // const client = new ApolloClient({
    //     uri: 'http://localhost:5000/graphql',
    //     cache: new InMemoryCache(),
    // })

    return (
        // <ApolloProvider client={client}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppClientHeader />
                <AppClientSideBar />
                <AppClientCentral />
                <AppLoadingIndicator />
            </Box>
        // </ApolloProvider>
    )
}
export { AppClient }
