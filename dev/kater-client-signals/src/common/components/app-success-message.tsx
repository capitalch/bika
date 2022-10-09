import { Alert, globalStore, Snackbar, } from '../misc/redirect'
function AppSuccessMessage() {
    const successMessage = globalStore.successMessage
    return (<Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        autoHideDuration={5000}
        open={successMessage.show.value}
        onClose={handleClose}>
        <Alert variant='filled'
            onClose={handleClose}
            severity='success'>
            {successMessage.message.value}
        </Alert>
    </Snackbar>)

    function handleClose() {
        globalStore.successMessage.show.value = false
    }
}
export { AppSuccessMessage }