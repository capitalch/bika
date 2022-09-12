import {
    appHookState,
    Box,
    CssBaseline,
    useGlobalMediaQuery,
    useEffect,
    useHookstate,
} from '../../misc/redirect'
import { AppClientMain } from './main/app-client-main'
import { AppClientHeader } from './header/app-client-header'
import { AppClientSideBar } from './side-bar/app-client-side-bar'
import { AppLoadingIndicator } from '../common/app-loading-indicator'

function AppClient() {
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
            <AppClientHeader />
            <AppClientSideBar />
            <AppClientMain />
            <AppLoadingIndicator />
        </Box>
    )

    function isSuperAdmin(){
        return(appGlobalState.loginInfo.userType.get()==='S')
    }
}
export { AppClient }
