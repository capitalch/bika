import {
    ChevronLeftIcon,
    ChevronRightIcon,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    InboxIcon,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MailIcon,
    styled,
    Typography,
    useHookstate,
    useState,
    useTheme,
} from '../../misc/redirect'
import { appMainHookState } from '../../hook-state/app-hookstate'

const drawerWidth = 240
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

function AppMainSideBar({ open, setOpen }: any) {
    const [, setRefresh] = useState({})
    const theme = useTheme()
    const appMainGlobalState = useHookstate(appMainHookState)
    const menu = appMainGlobalState.selectedMenu.get()

    const [openArray, setOpenArray]: any = useState(Array(menu.children.length).fill(false))
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
            open={appMainGlobalState.open.get()}>
            <DrawerHeader
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: theme.palette.background.default,
                }}>
                <Typography
                    sx={{
                        marginLeft: theme.spacing(3),
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: theme.palette.primary.dark,
                    }}
                    variant="h4">
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
            <MenuList root={menu} />
            {/* <List>{getListItems(appMainGlobalState.selectedMenu.get())}</List> */}
        </Drawer>
    )

    function MenuList({ root }: any) {
        return (<List>
            {getListItems(root)}
        </List>)

        function getListItems(first: any, isNested = false) {
            const listItems: any[] = []
            first?.children?.forEach((item: any, index: number) => {
                const listItem = (
                    <ListItem divider key={index} disablePadding>
                        <ListItemButton onClick={
                            () => {
                                setOpenArray((old: any[]) => {
                                    old[index] = true
                                    return ([...old])
                                })
                            }
                        }>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={item?.label || 'Missing'} />
                        </ListItemButton>
                    </ListItem>
                )
                listItems.push(listItem)
                if (item.children) {
                    const nestedItem =
                        <Collapse key={index + 100} in={openArray[index]} timeout='auto' unmountOnExit>
                            {/* <Divider /> */}
                            <List component='div'>
                                {getListItems(item)}
                            </List>
                        </Collapse>
                    listItems.push(nestedItem)
                }
            })
            return (listItems)
        }
    }

    function getListItems(root: any) {
        const listItems: any[] = []
        fillItems(root)
        function fillItems(first: any, isNested = false) {
            first?.children?.forEach((item: any, index: number) => {
                const listItem = (
                    <ListItem divider key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={item?.label || 'Missing'} />
                        </ListItemButton>
                    </ListItem>
                )
                listItems.push(listItem)
                if (item.children) {
                    fillItems(item, true)
                }
            })
        }


        return listItems
    }

    function handleDrawerClose() {
        appMainGlobalState.open.set(false)
    }
}
export { AppMainSideBar }


/* <List>
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
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List> */

