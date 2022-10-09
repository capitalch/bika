import { AppMaterialDialog, globalStore, styled, } from '../../misc/redirect'
import { AppErrorMessage } from '../../components/app-error-message'
import { AppSuccessMessage } from '../../components/app-success-message'

const drawerWidth = 240
const Main: any = styled(
    'main',
    {}
)(({ theme, open }: any) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))
function AppNavigationMain({ open }: any) {
    const misc = globalStore.misc
    const dialog = globalStore.dialog
    const dialog1 = globalStore.dialog1 // 2nd dialog
    return (
        <Main open={misc.open.value}>
            <DrawerHeader />
            <globalStore.misc.currentComponent.value />
            <AppMaterialDialog Content={dialog.content.value} isClosable={dialog.isClosable.value} showDialog={dialog.showDialog.value} title={dialog.title.value} />
            <AppMaterialDialog Content={dialog1.content.value} isClosable={dialog1.isClosable.value} showDialog={dialog1.showDialog.value} title={dialog1.title.value} />
            <AppErrorMessage />
            <AppSuccessMessage />
        </Main>
    )
}
export { AppNavigationMain }

