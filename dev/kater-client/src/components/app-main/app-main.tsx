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

function AppMain() {
    const appMainGlobalState = useHookstate(appMainHookState)
    // const entireGlobalState = useHookstate(entireHookState)
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()


    useEffect(() => {
        //By default if xl size and user already logged in then show side menu
        if (appMainGlobalState.appUser.isLoggedIn.get())
            appMainGlobalState.open.set(isExtraLargeSizeUp)
    })

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppMainHeader />
            <AppMainSideBar />
            <AppMainCentral />
            <AppMainLoadingIndicator />
        </Box>
    )
}
export { AppMain }


