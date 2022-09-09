import { styled, useHookstate } from '../../misc/redirect'
import { appHookState } from '../../hook-state/app-hookstate'
import { componentMapping } from './app-client-central-components-mapping'
import { AppErrorMessage } from '../common/app-error-message'
// import { UserLogin } from '../../modules/authentication/user-login'

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
function AppClientCentral({ open }: any) {
    const appGlobalState = useHookstate(appHookState)
    const currentComponentName:string = appGlobalState.currentComponentName.get()
    return (
        <Main open={appGlobalState.open.get()}>
            <DrawerHeader />
            {/* <UserLogIn /> */}
            {componentMapping[currentComponentName]}
            <AppErrorMessage />
        </Main>
    )
}
export { AppClientCentral }

