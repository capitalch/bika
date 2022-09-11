import { appHookState } from '../../hook-state/app-hookstate'
import {
    CloseIcon,
    Dialog,
    DialogContent,
    DialogTitle,
    Draggable,
    IconButton,
    Paper,
    Typography,
    useHookstate,
} from '../../misc/redirect'

function AppMaterialDialog({ Content, isClosable }: any) {
    const appGlobalState = useHookstate(appHookState)
    return (
        <Dialog open={appGlobalState.dialog.showDialog.get()} PaperComponent={PaperComponent}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {appGlobalState.dialog.title.get()}
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
        appGlobalState.dialog.showDialog.set(false)
    }
}
export { AppMaterialDialog }

function PaperComponent(props: any) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}
