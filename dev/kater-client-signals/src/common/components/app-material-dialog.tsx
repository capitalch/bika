import {
    CloseIcon,
    Dialog,
    DialogContent,
    DialogTitle,
    globalStore,
    IconButton,
    If,
    MaterialDialog,
    Then,
    Typography,
} from '../misc/redirect'

function AppMaterialDialog({ Content, isClosable, showDialog, title }: MaterialDialog) {    
    return (
        <Dialog open={showDialog}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Typography variant='dialogTitle'>{title}   </Typography>
                <If condition={isClosable}>
                    <Then>
                        <IconButton
                            sx={{ mr: -1.8 }}
                            size="small"
                            color="default"
                            onClick={handleClose}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Then>
                </If>
            </DialogTitle>
            <DialogContent>
                <Content />
            </DialogContent>
        </Dialog>
    )

    function handleClose() {
        globalStore.dialog.showDialog.value = false
    }
}

export { AppMaterialDialog }
