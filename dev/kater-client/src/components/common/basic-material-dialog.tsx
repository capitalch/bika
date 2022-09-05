import { appMainHookState } from '../../hook-state/app-hookstate'
import {
    CloseIcon,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    useHookstate,
} from '../../misc/redirect'

function BasicMaterialDialog({ Content, isClosable }: any) {
    const appMainGlobalState = useHookstate(appMainHookState)
    return (
        <Dialog open={appMainGlobalState.dialog.showDialog.get()}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {appMainGlobalState.dialog.title.get()}
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
        appMainGlobalState.dialog.showDialog.set(false)
    }
}
export { BasicMaterialDialog }
