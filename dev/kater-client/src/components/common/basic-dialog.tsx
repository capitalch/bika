import {
    Box,
    CloseIcon,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    useState,
    useTheme,
} from '../../misc/redirect'

function BasicMaterialDialog({ meta }: any) {

    return (
        <Dialog open={meta.dialogConfig.showDialog.get()}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Box>{meta.dialogConfig.title.get()}</Box>
                <IconButton
                    sx={{ mr: -2.5 }}
                    size="small"
                    color="default"
                    onClick={handleClose}
                    aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
        </Dialog>
    )

    function handleClose() {
        meta.dialogConfig.showDialog.set(false)
    }
}
export { BasicMaterialDialog }
