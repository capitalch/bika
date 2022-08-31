import {
    ArrowDropDownIcon,
    Box,
    Button,
    IconButton,
    MenuIcon,
    MuiAppBar,
    styled,
    Toolbar,
    Typography,
    useHookstate,
} from '../../misc/redirect'
import { appMainHookState } from '../../hook-state/app-hookstate'

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

function AppMainHeader({ open, setOpen }: any) {
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
                {/* <Typography variant="h6" noWrap component="div">
                    Persistent drawer
                </Typography> */}
            </Toolbar>
        </AppBar>
    )

    function handleCateringClick() {
        appMainGlobalState.selectedMenu.set(cateringMenu)
    }

    function handleLoginClick() { }

    function handleDrawerOpen() {
        // setOpen(true)
        appMainGlobalState.open.set(true)
    }
}
export { AppMainHeader }

const cateringMenu = {
    children: [
        {
            name: 'home',
            label: 'Home',
            path: 'home',
            breadCrumb: 'Home',
            componentName: 'appHome',
            iconName: '',
            controlId: 1,
        },
        {
            name: 'masters',
            label: 'Masters',
            path: 'masters',
            breadCrumb: 'Masters',
            iconName: '',
            controlId: 2,
            children: [
                {
                    name: 'misc',
                    label: 'Misc',
                    path: 'mastesrs-misc',
                    breadCrumb: 'Masters > Misc',
                    componentName: 'miscMasters',
                    iconName: '',
                    controlId: 3,
                },
                {
                    name: 'globalSettings',
                    label: 'Global settings',
                    path: 'masters-globalSettings',
                    breadCrumb: 'Masters > Global settings',
                    componentName: '',
                    iconName: '',
                    controlId: 0,
                },
                {
                    name: 'branchSettings',
                    label: 'Branch settings',
                    path: 'masters-branchSettings',
                    breadCrumb: 'Masters > Branch settings',
                    componentName: '',
                    iconName: '',
                    controlId: 0,
                },
                {
                    name: 'companyInfo',
                    label: 'Company info',
                    path: 'masters-companyInfo',
                    breadCrumb: 'masters > Company info',
                    componentName: '',
                    iconName: '',
                    controlId: 0,
                }
            ],
        },
        {
            name: 'reports',
            label: 'Reports',
            path: 'reports',
            breadCrumb: 'Reports',
            iconName: '',
            controlId: 4,
            children: [{
                name: 'report1',
                label: 'Report1',
                path: 'reports-report1',
                breadCrumb: 'Reports > Report1',
                iconName: '',
                controlId: 4,
            }],
        },
    ],
}
export { cateringMenu }
