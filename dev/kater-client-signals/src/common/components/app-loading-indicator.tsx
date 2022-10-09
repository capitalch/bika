import { Backdrop, CircularProgress, globalStore} from '../misc/redirect'

function AppLoadingIndicator() {
    const misc = globalStore.misc
    return (
        <Backdrop sx={{ zIndex: 9999 }} open={misc.showLoadingDialog.value}>
            <CircularProgress />
        </Backdrop>
    )
}
export { AppLoadingIndicator }