import {
    appMainHookState,
    Box,
    CssBaseline,
    useGlobalMediaQuery,
    useEffect,
    useHookstate,
} from '../../misc/redirect'
import { AppMainCentral } from './app-main-central'
import { AppMainHeader } from './app-main-header'
import { AppMainSideBar } from './app-main-side-bar'
import { AppMainLoadingIndicator } from './app-main-loading-indicator'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from '@apollo/client'

function AppMain() {
    const appMainGlobalState = useHookstate(appMainHookState)
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()

    useEffect(() => {
        //By default if xl size and user already logged in then show side menu
        if (appMainGlobalState.appUser.isLoggedIn.get())
            appMainGlobalState.open.set(isExtraLargeSizeUp)
    })

    const client = new ApolloClient({
        uri: 'http://localhost:5000/graphql',
        cache: new InMemoryCache(),
    })

    return (
        <ApolloProvider client={client}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppMainHeader />
                <AppMainSideBar />
                <AppMainCentral />
                <AppMainLoadingIndicator />
            </Box>
        </ApolloProvider>
    )
}
export { AppMain }
