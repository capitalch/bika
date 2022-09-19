import { Alert, globalStore, Snackbar,  useSnapshot } from '../../misc/redirect'
function AppSuccessMessage() {
    const snapSuccessMessage = useSnapshot(globalStore.successMessage)
    return (<Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        autoHideDuration={5000}
        open={snapSuccessMessage.show}
        onClose={handleClose}>
        <Alert variant='filled'
            onClose={handleClose}
            severity='success'>
            {snapSuccessMessage.message}
        </Alert>
    </Snackbar>)

    function handleClose() {
        globalStore.successMessage.show = false
    }
}
export { AppSuccessMessage }