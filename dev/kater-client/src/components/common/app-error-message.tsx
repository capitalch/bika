import { Alert, appHookState, Snackbar, useHookstate } from '../../misc/redirect'
function AppErrorMessage() {
    const appGlobalState = useHookstate(appHookState)
    return (<Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        open={appGlobalState.errorMessage.show.get()}
        onClose={handleClose}>
        <Alert variant='filled'
            onClose={handleClose}
            severity='error'>
            {appGlobalState.errorMessage.message.get()}
        </Alert>
    </Snackbar>)

    function handleClose() {
        appGlobalState.errorMessage.merge({message:'', show:false})
    }
}
export { AppErrorMessage }