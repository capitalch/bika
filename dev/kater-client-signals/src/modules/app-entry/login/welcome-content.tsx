import { CSSProperties } from '@mui/styled-engine'
import {
    Box,
    Button,
    globalStore,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    PasswordIcon,
    PersonIcon,
    useEffect,
    useTheme,
} from '../../../common/misc/redirect'
import { resetGlobalStore } from '../../../stores/global-store'

function WelcomeContent() {
    const theme = useTheme()
    const loginInfo = globalStore.loginInfo
    useEffect(() => {
        globalStore.dialog.title.value = `Welcome ${loginInfo.uid.value}`
    })
    return (
        <Box sx={getStyles()}>
            <List disablePadding component="div">
                <ListItem
                    key="1"
                    disableGutters
                    divider
                    disablePadding
                    sx={{
                        border: '1px solid lightGrey',
                        mb: theme.spacing(2),
                    }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText>Change user id</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem
                    key="2"
                    disableGutters
                    divider
                    disablePadding
                    sx={{ border: '1px solid lightGrey' }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PasswordIcon />
                        </ListItemIcon>
                        <ListItemText>Change password</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <Button
                sx={{ mt: theme.spacing(2) }}
                variant="contained"
                onClick={handleSubmit}>
                Log out
            </Button>
        </Box>
    )
    function getStyles() {
        const styles: CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: theme.spacing(35),
            height: 'auto',
        }
        return styles
    }
    // logout
    function handleSubmit() {
        globalStore.value.resetLoginInfo()
        globalStore.dialog.showDialog.value = false
        resetGlobalStore()
    }
}
export {WelcomeContent}