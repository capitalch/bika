import {
    appMainHookState,
    Box,
    CssBaseline,
    useGlobalMediaQuery,
    useEffect,
    useHookstate,
} from '../../misc/redirect'
import { AppClientCentral } from './app-client-central'
import { AppClientHeader } from './app-client-header'
import { AppClientSideBar } from './app-client-side-bar'
import { AppClientLoadingIndicator } from './app-client-loading-indicator'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from '@apollo/client'

function AppClient() {
    const appMainGlobalState = useHookstate(appMainHookState)
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()

    useEffect(() => {
        //By default if xl size and user already logged in then show side menu
        if (appMainGlobalState.appUser.isLoggedIn.get())
            appMainGlobalState.open.set(isExtraLargeSizeUp)
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
                <AppClientLoadingIndicator />
            </Box>
        // </ApolloProvider>
    )
}
export { AppClient }
