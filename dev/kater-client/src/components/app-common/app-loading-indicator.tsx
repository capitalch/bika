import { appHookState, } from '../../hook-state/app-hookstate'
import { Backdrop, CircularProgress, useHookstate } from '../../misc/redirect'

function AppLoadingIndicator() {
    const appGlobalState = useHookstate(appHookState)
    return (
        <Backdrop sx={{ zIndex: 9999 }} open={appGlobalState.misc.showLoadingDialog.get()}>
            <CircularProgress />
        </Backdrop>
    )
}
export { AppLoadingIndicator }