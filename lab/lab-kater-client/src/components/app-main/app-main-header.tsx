import {
    appMainHookState,
    ArrowDropDownIcon,
    Box,
    Button,
    // entireHookState,
    IconButton,
    MenuIcon,
    MuiAppBar,
    styled,
    Toolbar,
    Typography,
    useHookstate,
    useTheme,
    UserLoginWelcome
} from '../../misc/redirect'
// import { appMainHookState, entireHookState } from '../../hook-state/app-hookstate'
import { cateringMenu } from './app-main-catering-menu'
// import { UserLogin } from '../../modules/authentication/user-login'

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

function AppMainHeader() {
    const appMainGlobalState = useHookstate(appMainHookState)
    // const entireGlobalState = useHookstate(entireHookState)
    const theme = useTheme()
    return (
        <AppBar position="fixed" open={appMainGlobalState.open.get()}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        mr: 2,
                        ...(appMainGlobalState.open.get() && {
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
                        alignItems: 'center'
                    }}>
                    <Button
                        color="inherit"
                        variant="menuButton"
                        size="large"
                        onClick={handleCateringClick}>
                        Catering
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: theme.spacing(1) }} variant='body2' component='span'>{appMainGlobalState.appUser.uid.get()}</Typography>
                        <Button
                            color="inherit"
                            variant="menuButton"
                            size="small"
                            endIcon={<ArrowDropDownIcon />}
                            onClick={handleLoginClick}>
                            {appMainGlobalState.appUser.isLoggedIn.get() ? 'Welcome' : 'Login'}
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
            <UserLoginWelcome />
        </AppBar>
    )

    function handleCateringClick() {
        appMainGlobalState.selectedMenu.set(cateringMenu)
    }

    function handleLoginClick() { 
        appMainGlobalState.dialog.showDialog.set(true)
    }

    function handleDrawerOpen() {
        // Drawer can only be opened if user logged in
        if (appMainGlobalState.appUser.isLoggedIn.get()) {
            appMainGlobalState.open.set(true)
        } else {
            appMainGlobalState.dialog.showDialog.set(true)
        }
    }
}
export { AppMainHeader }