import {
    appHookState,
    Box,
    CssBaseline,
    useGlobalMediaQuery,
    useEffect,
    useHookstate,
} from '../../misc/redirect'
import { AppNavigationMain } from './main/app-navigation-main'
import { AppNavigationHeader } from './header/app-navigation-header'
import { AppNavigationSideBar } from './side-bar/app-navigation-side-bar'
import { AppLoadingIndicator } from '../app-common/app-loading-indicator'

function AppNavigation() {
    const appGlobalState = useHookstate(appHookState)
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()

    useEffect(() => {
        //By default if xl size and user already logged in then show side menu
        if (appGlobalState.loginInfo.isLoggedIn.get() && (!isSuperAdmin()))
            appGlobalState.misc.open.set(isExtraLargeSizeUp)
    })

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppNavigationHeader />
            <AppNavigationSideBar />
            <AppNavigationMain />
            <AppLoadingIndicator />
        </Box>
    )

    function isSuperAdmin(){
        return(appGlobalState.loginInfo.userType.get()==='S')
    }
}
export { AppNavigation }
