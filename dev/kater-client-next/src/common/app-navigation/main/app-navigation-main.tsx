import { globalStore, styled,  useEffect,  useSnapshot } from '../../../shared-utils/redirect'
import { componentMaps } from '../../../temp/app-navigation-main-component-maps'
import { AppErrorMessage } from '../../app-components/app-error-message'

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
    const currentComponentName: string = snapMisc.currentComponentName
    return (
        <Main open={snapMisc.open}>
            <DrawerHeader />
            {/* {componentMaps[currentComponentName] || null} */}
            <globalStore.misc.currentComponent />
            <AppErrorMessage />
        </Main>
    )
}
export { AppNavigationMain }

