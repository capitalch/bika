import {
    ArrowDropDownIcon,
    ArrowDropUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClickAwayListener,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    immer,
    InboxIcon,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    styled,
    Typography,
    useGlobalMediaQuery,
    useHookstate,
    useState,
    useTheme,
} from '../misc/redirect'

import { appMainHookState } from '../hook-state/app-hookstate'
import { iconMapping } from './app-main-side-bar-icons-mapping'

const drawerWidth = 240
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

function AppMainSideBar() {
    const theme = useTheme()
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()
    const appMainGlobalState = useHookstate(appMainHookState)
    
    const menu = appMainGlobalState.selectedMenu.get()
    const [openArray, setOpenArray]: any = useState(
        Array(menu.children.length).fill(false)
    )
    const [selectedControlId, setSelectedControlId] = useState(0)
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                '& .Mui-selected': { // for selected item to show red
                    color: 'red',
                    backgroundColor: `${theme.palette.grey[200]}!important`
                }
            }}
            variant="persistent"
            anchor="left"
            transitionDuration={300}
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
            <LeftMenuList root={menu} />
        </Drawer>
    )

    function LeftMenuList({ root }: any) {
        return (
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleDrawerCloseIfRequired}>
                <List>{getListItems(root)}</List>
            </ClickAwayListener>
        )

        function getListItems(first: any) {
            const listItems: any[] = []
            first?.children?.forEach((item: any, index: number) => {
                const listItem = (
                    <MenuItem key={index} divider disableGutters sx= {{}}  selected={selectedControlId === item.controlId} >
                        <ListItemButton
                            onClick={(e: any) => handleListItemButtonclick(e, item, index)}>
                            <ListItemIcon>
                                {item.iconName ? (
                                    iconMapping[item.iconName]
                                ) : (
                                    <InboxIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={item?.label || 'Missing'} />
                            {getArrowUpDownIcon(item, index)}
                        </ListItemButton>
                    </MenuItem>
                )
                listItems.push(listItem)
                if (item.children) {
                    const nestedItem = (
                        <Collapse
                            key={index + 100}
                            in={openArray[index]}
                            timeout="auto"
                            unmountOnExit>
                            <List
                                disablePadding
                                component="div"
                                sx={{ pl: theme.spacing(2), pt: 0 }}>
                                {getListItems(item)}
                            </List>
                        </Collapse>
                    )
                    listItems.push(nestedItem)
                }
            })
            return listItems
        }
    }

    function getArrowUpDownIcon(item: any, index: number) {
        let ret = undefined
        if (item.children) {
            ret =
                openArray[index] === true ? (
                    <ArrowDropUpIcon />
                ) : (
                    <ArrowDropDownIcon />
                )
        }
        return ret
    }

    function handleDrawerCloseIfRequired() {
        if (!isExtraLargeSizeUp) {
            if (appMainGlobalState.open.get()) {
                appMainGlobalState.open.set(false)
            }
        }
    }

    function handleDrawerClose() {
        appMainGlobalState.open.set(false)
    }

    function handleListItemButtonclick(e:any, item: any, index: number) {
        if (item.children) {
            const newArr = immer(
                openArray,
                (draft: any[]) => {
                    const temp = draft[index]
                    draft.fill(false)
                    draft[index] = !temp
                }
            )
            setOpenArray(newArr)
            setSelectedControlId(0)
        } else {
            setSelectedControlId(item.controlId)
            appMainGlobalState.currentComponentName.set(item.componentName)
            handleDrawerCloseIfRequired()
        }
    }
}

function AppMainSideBar1() {
    const theme = useTheme()
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()
    const appMainGlobalState = useHookstate(appMainHookState)
    const menu = appMainGlobalState.selectedMenu.get()
    const [openArray, setOpenArray]: any = useState(
        Array(menu.children.length).fill(false)
    )
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
            transitionDuration={300}
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
            <LeftMenuList root={menu} />
        </Drawer>
    )

    function LeftMenuList({ root }: any) {
        return (
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleDrawerCloseIfRequired}>
                <List>{getListItems(root)}</List>
            </ClickAwayListener>
        )

        function getListItems(first: any) {
            const listItems: any[] = []
            first?.children?.forEach((item: any, index: number) => {
                const listItem = (
                    <ListItem divider key={index} disablePadding >
                        <ListItemButton
                            onClick={(e:any) => handleListItemButtonclick(item, index)}>
                            <ListItemIcon>
                                {item.iconName ? (
                                    iconMapping[item.iconName]
                                ) : (
                                    <InboxIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={item?.label || 'Missing'} />
                            {getArrowUpDownIcon(item, index)}
                        </ListItemButton>
                    </ListItem>
                )
                listItems.push(listItem)
                if (item.children) {
                    const nestedItem = (
                        <Collapse
                            key={index + 100}
                            in={openArray[index]}
                            timeout="auto"
                            unmountOnExit>
                            <List
                                disablePadding
                                component="div"
                                sx={{ pl: theme.spacing(2), pt: 0 }}>
                                {getListItems(item)}
                            </List>
                        </Collapse>
                    )
                    listItems.push(nestedItem)
                }
            })
            return listItems
        }
    }

    function getArrowUpDownIcon(item: any, index: number) {
        let ret = undefined
        if (item.children) {
            ret =
                openArray[index] === true ? (
                    <ArrowDropUpIcon />
                ) : (
                    <ArrowDropDownIcon />
                )
        }
        return ret
    }

    function handleDrawerCloseIfRequired() {
        if (!isExtraLargeSizeUp) {
            if (appMainGlobalState.open.get()) {
                appMainGlobalState.open.set(false)
            }
        }
    }

    function handleDrawerClose() {
        appMainGlobalState.open.set(false)
    }

    function handleListItemButtonclick(item: any, index: number) {
        if (item.children) {
            const newArr = immer(
                openArray,
                (draft: any[]) => {
                    const temp = draft[index]
                    draft.fill(false)
                    draft[index] = !temp
                }
            )
            setOpenArray(newArr)
        } else {            
            appMainGlobalState.currentComponentName.set(item.componentName)
            handleDrawerCloseIfRequired()
        }
    }
}
export { AppMainSideBar }

