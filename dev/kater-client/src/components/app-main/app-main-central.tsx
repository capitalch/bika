import { styled, useHookstate } from '../../misc/redirect'
import { appMainHookState } from '../../hook-state/app-hookstate'
import { componentMapping } from './app-main-central-components-mapping'
import { UserLogIn } from '../../modules/authentication/user-log-in'

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
function AppMainCentral({ open }: any) {
    const appMainGlobalState = useHookstate(appMainHookState)
    const currentComponentName:string = appMainGlobalState.currentComponentName.get()
    return (
        <Main open={appMainGlobalState.open.get()}>
            <DrawerHeader />
            <UserLogIn />
            {/* {componentMapping[currentComponentName]} */}
        </Main>
    )
}
export { AppMainCentral }
