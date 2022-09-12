import {
    appHookState,
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
    useHookstate,
    useTheme,
    UserLoginWelcome,
    Typography,
} from '../../../misc/redirect'
import { sideBarMainMenu } from '../side-bar/app-client-side-bar-menus'

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

function AppClientHeader() {
    const appGlobalState = useHookstate(appHookState)
    const theme = useTheme()
    const userMap: any = { 'S': 'Super admin', 'A': 'Admin', 'B': 'Business user' }
    const userType: string = appGlobalState.loginInfo.userType.get() || ''
    const userTypeName = userMap[userType] || ''
    return (
        <AppBar position="fixed" open={appGlobalState.misc.open.get()}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        mr: 2,
                        ...(appGlobalState.misc.open.get() && {
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
                        {appGlobalState.misc.headerMainMenuName.get()}
                    </Button>
                    <Box>
                        <Typography variant='body2' component='span' color='beige'>{userTypeName}</Typography>
                        <IconButton onClick={handleLogoutClick}>
                            {appGlobalState.loginInfo.isLoggedIn.get() ? (
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
            <UserLoginWelcome />
        </AppBar>
    )

    function handleCateringClick() {
        appGlobalState.misc.sideBarMenu.set(sideBarMainMenu)
    }

    function handleLogoutClick() {
        appGlobalState.dialog.showDialog.set(true)
    }

    function handleDrawerOpen() {
        // Drawer can only be opened if user logged in and not super admin
        // const userType = appGlobalState.loginInfo.userType.get()
        if (appGlobalState.loginInfo.isLoggedIn.get() && (!isSuperAdmin())) {
            appGlobalState.misc.open.set(true)
        } else {
            // appGlobalState.dialog.showDialog.set(true)
        }
    }

    function isSuperAdmin() {
        return (appGlobalState.loginInfo.userType.get() === 'S')
    }
}
export { AppClientHeader }
