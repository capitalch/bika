import { AppMaterialDialog, globalStore, styled, useSnapshot } from '../../misc/redirect'
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
    const snapMisc = useSnapshot(globalStore.misc)
    const snapDialog = useSnapshot(globalStore.dialog)
    const snapDialog1 = useSnapshot(globalStore.dialog1) // 2nd dialog
    return (
        <Main open={snapMisc.open}>
            <DrawerHeader />
            <globalStore.misc.currentComponent />
            <AppMaterialDialog Content={snapDialog.content} isClosable={snapDialog.isClosable} showDialog={snapDialog.showDialog} title={snapDialog.title} />
            <AppMaterialDialog Content={snapDialog1.content} isClosable={snapDialog1.isClosable} showDialog={snapDialog1.showDialog} title={snapDialog1.title} />
            <AppErrorMessage />
            <AppSuccessMessage />
        </Main>
    )
}
export { AppNavigationMain }

