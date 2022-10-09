import {
    Box,
    CssBaseline,
    useGlobalMediaQuery,
    useEffect,
    useSnapshot,
    globalStore,
} from '../misc/redirect'
import { AppNavigationMain } from './main/app-navigation-main'
import { AppNavigationHeader } from './header/app-navigation-header'
import { AppNavigationSideBar } from './side-bar/app-navigation-side-bar'
import { AppLoadingIndicator } from '../components/app-loading-indicator'

function AppNavigation() {
    
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()
    const snapLoginInfo = useSnapshot(globalStore.loginInfo)
    useEffect(() => {
        //By default if xl size and user already logged in then show side menu
        if (snapLoginInfo.isLoggedIn) // && (!isSuperAdmin()))
            globalStore.misc.open = (isExtraLargeSizeUp)
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
        return (snapLoginInfo.userType === 'S')
    }
}
export { AppNavigation }
