import {
    CloseIcon,
    Dialog,
    DialogContent,
    DialogTitle,
    globalStore,
    IconButton,
    If,
    Then,
    Typography,
    useSnapshot,
} from '../misc/redirect'

function AppMaterialDialog() {
    const snap = useSnapshot(globalStore.dialog)
    return (
        <Dialog open={snap.showDialog}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Typography variant='dialogTitle'>{snap.title}   </Typography>
                <If condition={globalStore.dialog.isClosable}>
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
                <globalStore.dialog.content />
            </DialogContent>
        </Dialog>
    )

    function handleClose() {
        globalStore.dialog.showDialog = false
    }
}

export { AppMaterialDialog }
