import { Alert, globalStore, Snackbar,useSnapshot } from '../../misc/redirect'
function AppErrorMessage() {

    const snapErrorMessage = useSnapshot(globalStore.errorMessage)
    return (<Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        open={snapErrorMessage.show}
        onClose={handleClose}>
        <Alert variant='filled'
            onClose={handleClose}
            severity='error'>
            {snapErrorMessage.message}
        </Alert>
    </Snackbar>)

    function handleClose() {
        globalStore.errorMessage = { message: '', show: false }
    }
}
export { AppErrorMessage }