// import { appHookState, } from '../../global-state/app-hookstate'
import { Backdrop, CircularProgress, globalStore,  useSnapshot } from '../../shared-utils/redirect'

function AppLoadingIndicator() {
    const snap = useSnapshot(globalStore.misc)
    return (
        <Backdrop sx={{ zIndex: 9999 }} open={snap.showLoadingDialog}>
            <CircularProgress />
        </Backdrop>
    )
}
export { AppLoadingIndicator }