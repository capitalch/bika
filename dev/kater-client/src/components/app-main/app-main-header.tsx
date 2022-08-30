import { IconButton, MenuIcon, MuiAppBar, styled, Toolbar, Typography,useHookstate  } from '../../misc/redirect'
import { appMainHookState } from './app-main-hookstate'

const drawerWidth= 240
const AppBar: any = styled(MuiAppBar, {
})(({ theme, open }: any) => ({
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

function AppMainHeader({ open, setOpen}: any) {
    const appMainGlobalState = useHookstate(appMainHookState)

    return (
    // <AppBar position="fixed" open={open}>
        <AppBar position="fixed" open={appMainGlobalState.open.get()}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                // sx={{ mr: 2, ...(open && { display: 'none' }) }}
                sx={{ mr: 2, ...(appMainGlobalState.open.get() && { display: 'none' }) }}
                >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                Persistent drawer
            </Typography>
        </Toolbar>
    </AppBar>)

    function handleDrawerOpen() {
        // setOpen(true)
        appMainGlobalState.open.set(true)
    }

}
export { AppMainHeader }