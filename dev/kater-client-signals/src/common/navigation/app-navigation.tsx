import {
    Box,
    CssBaseline,
    useGlobalMediaQuery,
    useEffect,
    globalStore,
} from '../misc/redirect'
import { AppNavigationMain } from './main/app-navigation-main'
import { AppNavigationHeader } from './header/app-navigation-header'
import { AppNavigationSideBar } from './side-bar/app-navigation-side-bar'
import { AppLoadingIndicator } from '../components/app-loading-indicator'

function AppNavigation() {
    
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()
    // const snapLoginInfo = useSnapshot(globalStore.loginInfo)
    const loginInfo = globalStore.loginInfo
    useEffect(() => {
        //By default if xl size and user already logged in then show side menu
        if (loginInfo.isLoggedIn.value && (!isSuperAdmin()))
            globalStore.misc.open.value = (isExtraLargeSizeUp)
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

    function isSuperAdmin() {
        return (loginInfo.userType.value === 'S')
    }
}
export { AppNavigation }
