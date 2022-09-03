import {
    ArrowDropDownIcon,
    Box,
    Button,
    IconButton,
    MenuIcon,
    MuiAppBar,
    styled,
    Toolbar,
    useHookstate,
} from '../../misc/redirect'
import { appMainHookState } from '../../hook-state/app-hookstate'
import { cateringMenu } from './app-main-catering-menu'
import { UserLogin } from '../../modules/authentication/user-login'

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
                    }}>
                    <Button
                        color="inherit"
                        variant="menuButton"
                        size="large"
                        onClick={handleCateringClick}>
                        Catering
                    </Button>
                    <Button
                        color="inherit"
                        variant="menuButton"
                        size="large"
                        endIcon={<ArrowDropDownIcon />}
                        onClick={handleLoginClick}>
                        Login
                    </Button>
                </Box>
            </Toolbar>
            <UserLogin />
        </AppBar>
    )

    function handleCateringClick() {
        appMainGlobalState.selectedMenu.set(cateringMenu)
    }

    function handleLoginClick() { }

    function handleDrawerOpen() {
        appMainGlobalState.open.set(true)
    }
}
export { AppMainHeader }