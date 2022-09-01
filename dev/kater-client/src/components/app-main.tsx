import {
    Box,
    CssBaseline,
    useGlobalMediaQuery,
    useEffect,
    useHookstate,
} from '../misc/redirect'
import { AppMainCentral } from './app-main-central'
import { AppMainHeader } from './app-main-header'
import { appMainHookState } from '../hook-state/app-hookstate'
import { AppMainSideBar } from './app-main-side-bar'

function AppMain() {
    const appMainGlobalState = useHookstate(appMainHookState)
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()


    useEffect(() => {
        appMainGlobalState.open.set(isExtraLargeSizeUp)
    })

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppMainHeader  />
            <AppMainSideBar />
            <AppMainCentral />
        </Box>
    )
}
export { AppMain}


