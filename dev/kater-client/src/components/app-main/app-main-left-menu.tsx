import { ChevronLeftIcon, ChevronRightIcon, Divider, Drawer, IconButton, InboxIcon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MailIcon, styled, Typography, useHookstate, useTheme } from '../../misc/redirect'
import { appMainHookState } from './app-main-hookstate'

const drawerWidth = 240
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

function AppMainLeftMenu({ open, setOpen }: any) {
    const theme = useTheme()
    const appMainGlobalState = useHookstate(appMainHookState)
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            // open={open}
            open = {appMainGlobalState.open.get()}
            >
            <DrawerHeader
                sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    sx={{ marginLeft: theme.spacing(3) }}
                    variant="h6">
                    KATER
                </Typography>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? (
                        <ChevronLeftIcon />
                    ) : (
                        <ChevronRightIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                    (text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? (
                                    <InboxIcon />
                                ) : (
                                    <MailIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )

    function handleDrawerClose() {
        // setOpen(false)
        appMainGlobalState.open.set(false)
    }
}
export { AppMainLeftMenu }