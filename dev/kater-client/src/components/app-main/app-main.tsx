import {
    Box,
    CssBaseline,
    useGlobalMediaQuery,
    useEffect,
    useHookstate,
    useState,
} from '../../misc/redirect'
import { AppMainCentral } from './app-main-central'
import { AppMainHeader } from './app-main-header'
import { appMainHookState } from './app-main-hookstate'
import { AppMainLeftMenu } from './app-main-left-menu'

function AppMain() {
    const appMainGlobalState = useHookstate(appMainHookState)

    const { isExtraLargeSizeUp } = useGlobalMediaQuery()
    const [open, setOpen]: any = useState(isExtraLargeSizeUp)


    useEffect(() => {
        appMainGlobalState.open.set(isExtraLargeSizeUp)
    })

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppMainHeader open={open} setOpen={setOpen} />
            <AppMainLeftMenu open={open} setOpen={setOpen} />
            <AppMainCentral open={open} />
        </Box>
    )
}
export { AppMain}


