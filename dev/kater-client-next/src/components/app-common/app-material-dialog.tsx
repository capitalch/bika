// import { appHookState } from '../../global-state/app-hookstate'
import {
    CloseIcon,
    Dialog,
    DialogContent,
    DialogTitle,
    globalStore,
    IconButton,
    Typography,
    useSnapshot,
} from '../../misc/redirect'

function AppMaterialDialog({ Content, isClosable }: any) {
    const snap = useSnapshot(globalStore.dialog)
    return (
        <Dialog open={snap.showDialog}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {snap.title}
                </Typography>
                {isClosable && (
                    <IconButton
                        sx={{ mr: -1.8 }}
                        size="small"
                        color="default"
                        onClick={handleClose}
                        aria-label="close">
                        <CloseIcon />
                    </IconButton>
                )}
            </DialogTitle>
            <DialogContent>
                <Content />
            </DialogContent>
        </Dialog>
    )

    function handleClose() {
        globalStore.dialog.showDialog = false
    }
}
export { AppMaterialDialog }
