import {
    Box,
    CloseIcon,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    useState,
    useTheme,
} from '../../misc/redirect'

function BasicMaterialDialog({ meta }: any) {
    const [,setRefresh] = useState({})
// const Content = JSON.parse(JSON.stringify(meta.dialogConfig.content.get())) 
const Content = meta.current.dialogConfig.content
    return (
        <Dialog open={meta.current.dialogConfig.showDialog}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Typography sx={{fontWeight:'bold'}}>{meta.current.dialogConfig.title}</Typography>
                <IconButton
                    sx={{ mr: -1.8 }}
                    size="small"
                    color="default"
                    onClick={handleClose}
                    aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {/* {meta.dialogConfig.content} */}
                <Content />
            </DialogContent>
        </Dialog>
    )

    function handleClose() {
        meta.current.dialogConfig.showDialog = false
        setRefresh({})
    }
}
export { BasicMaterialDialog }
