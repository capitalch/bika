import { Alert, appHookState, Snackbar, useHookstate } from '../../misc/redirect'
function AppSuccessMessage() {
    const appGlobalState = useHookstate(appHookState)
    return (<Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        autoHideDuration={5000}
        open={appGlobalState.successMessage.show.get()}
        onClose={handleClose}>
        <Alert variant='filled'
            onClose={handleClose}
            severity='success'>
            {appGlobalState.successMessage.message.get()}
        </Alert>
    </Snackbar>)

    function handleClose() {
        appGlobalState.successMessage.show.set(false)
    }
}
export { AppSuccessMessage }