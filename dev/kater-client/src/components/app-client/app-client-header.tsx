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
} from '../../misc/redirect'
import { sideBarMainMenu } from './app-client-side-bar-menus'

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
                        Catering
                    </Button>
                    {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: theme.spacing(1) }} variant='body2' component='span'>{appGlobalState.loginInfo.uid.get()}</Typography>
                        <Button
                            color="inherit"
                            variant="menuButton"
                            size="small"
                            endIcon={<ArrowDropDownIcon />}
                            onClick={handleLoginClick}>
                            {appGlobalState.loginInfo.isLoggedIn.get() ? 'Welcome' : 'Login'}
                        </Button>
                    </Box> */}
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
            </Toolbar>
            <UserLoginWelcome />
        </AppBar>
    )

    function handleCateringClick() {
        appGlobalState.misc.selectedMenu.set(sideBarMainMenu)
    }

    function handleLogoutClick() {
        appGlobalState.dialog.showDialog.set(true)
    }

    function handleDrawerOpen() {
        // Drawer can only be opened if user logged in
        if (appGlobalState.loginInfo.isLoggedIn.get()) {
            appGlobalState.misc.open.set(true)
        } else {
            appGlobalState.dialog.showDialog.set(true)
        }
    }
}
export { AppClientHeader }
