import { Alert, globalStore, Snackbar } from '../misc/redirect'
function AppErrorMessage() {

    const errorMessage = globalStore.errorMessage
    return (<Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        open={errorMessage.show.value}
        onClose={handleClose}>
        <Alert variant='filled'
            onClose={handleClose}
            severity='error'>
            {errorMessage.message.value}
        </Alert>
    </Snackbar>)

    function handleClose() {
        globalStore.errorMessage.message.value = ''
        globalStore.errorMessage.show.value = false
    }
}
export { AppErrorMessage }