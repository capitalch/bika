import { styled, Typography, useHookstate } from '../../misc/redirect'
import { appMainHookState } from '../../hook-state/app-hookstate'
import { CateringHome } from '../../entities/catering/components/catering_home'

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
            {componentMapping[currentComponentName]}
        </Main>
    )
}
export { AppMainCentral }

const componentMapping:any = {
    cateringHome: <CateringHome />
}

{
    /* <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet.
                Semper risus in hendrerit gravida rutrum quisque non tellus.
                Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed
                adipiscing. Amet nisl suscipit adipiscing bibendum est
                ultricies integer quis. Cursus euismod quis viverra nibh
                cras. Metus vulputate eu scelerisque felis imperdiet proin
                fermentum leo. Mauris commodo quis imperdiet massa
                tincidunt. Cras tincidunt lobortis feugiat vivamus at augue.
                At augue eget arcu dictum varius duis at consectetur lorem.
                Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
                Consequat mauris nunc congue nisi vitae suscipit. Fringilla
                est ullamcorper eget nulla facilisi etiam dignissim diam.
                Pulvinar elementum integer enim neque volutpat ac tincidunt.
                Ornare suspendisse sed nisi lacus sed viverra tellus. Purus
                sit amet volutpat consequat mauris. Elementum eu facilisis
                sed odio morbi. Euismod lacinia at quis risus sed vulputate
                odio. Morbi tincidunt ornare massa eget egestas purus
                viverra accumsan in. In hendrerit gravida rutrum quisque non
                tellus orci ac. Pellentesque nec nam aliquam sem et tortor.
                Habitant morbi tristique senectus et. Adipiscing elit duis
                tristique sollicitudin nibh sit. Ornare aenean euismod
                elementum nisi quis eleifend. Commodo viverra maecenas
                accumsan lacus vel facilisis. Nulla posuere sollicitudin
                aliquam ultrices sagittis orci a.
            </Typography> */
}
