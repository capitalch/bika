import { LoginContent } from '../../../modules/app-entry/login/login-content'
import { WelcomeContent } from '../../../modules/app-entry/login/welcome-content'
import {
    ArrowDropDownIcon,
    Box,
    Button,
    IconButton,
    LogoutIcon,
    MenuIcon,
    MuiAppBar,
    PersonIcon,
    styled,
    Toolbar,
    useTheme,
    Typography,
    useSnapshot,
    globalStore,
    useEffect,
    showDialog,
} from '../../misc/redirect'
import { sideBarMainMenu } from '../side-bar/app-navigation-side-bar-menus'
const drawerWidth = 240
const AppBar: any = styled(
    MuiAppBar,
    {}
)(({ theme, open }: any) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

function AppNavigationHeader() {
    const snapLoginInfo = useSnapshot(globalStore.loginInfo)
    const snapMisc = useSnapshot(globalStore.misc)
    // const snapDialog = useSnapshot(globalStore.dialog)
    // const snapDialog1 = useSnapshot(globalStore.dialog1) // 2nd dialog
    const theme = useTheme()
    const userMap: any = { S: 'Super admin', A: 'Admin', B: 'Business user' }
    const userType: string = snapLoginInfo.userType || ''
    const userTypeName = userMap[userType || ''] || ''

    useEffect(() => {
        if (!snapLoginInfo.isLoggedIn) {
            showDialog({
                title: 'User login',
                isClosable: false,
                content: LoginContent,
            })
        }
    })

    return (
        <AppBar position="fixed" open={snapMisc.open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        mr: 2,
                        ...(snapMisc.open && {
                            display: 'none',
                        }),
                    }}>
                    <MenuIcon />
                </IconButton>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                    }}>
                    <Button
                        color="inherit"
                        variant="menuButton"
                        size="large"
                        onClick={handleCateringClick}>
                        {snapMisc.headerMainMenuName}
                    </Button>
                    <Box>
                        <Typography
                            variant="body2"
                            component="span"
                            color="beige">
                            {userTypeName}
                        </Typography>
                        <IconButton onClick={handleLogoutClick}>
                            {snapLoginInfo.isLoggedIn ? (
                                <LogoutIcon
                                    sx={{
                                        color: theme.palette.common.white,
                                    }}
                                />
                            ) : (
                                <PersonIcon
                                    sx={{ color: theme.palette.common.white }}
                                />
                            )}
                            <ArrowDropDownIcon
                                sx={{ color: theme.palette.common.white }}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>            
        </AppBar>
    )

    function handleCateringClick() {
        globalStore.misc.sideBarMenu = sideBarMainMenu
    }

    function handleLogoutClick() {
        showDialog({
            title: `Welcome ${snapLoginInfo.uid}`,
            content: WelcomeContent,
            isClosable: true,
        })
    }

    function handleDrawerOpen() {
        // Drawer can only be opened if user logged in and not super admin
        // const userType = appglobalStore.loginInfo.userType.get()
        if (snapLoginInfo.isLoggedIn && !isSuperAdmin()) {
            globalStore.misc.open = true
        } else {
            // appglobalStore.dialog.showDialog.set(true)
        }
    }

    function isSuperAdmin() {
        return snapLoginInfo.userType === 'S'
    }
}
export { AppNavigationHeader }
