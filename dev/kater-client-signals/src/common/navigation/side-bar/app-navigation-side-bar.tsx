import {
    ArrowDropDownIcon,
    ArrowDropUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClickAwayListener,
    Collapse,
    Divider,
    Drawer,
    globalStore,
    IconButton,
    InboxIcon,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    styled,
    Typography,
    useDeepSignal,
    useGlobalMediaQuery,
    useTheme,
} from '../../misc/redirect'

import { iconMaps } from './app-navigation-side-bar-menu-icon-maps'

const drawerWidth = 240
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

function AppNavigationSideBar() {
    const theme = useTheme()
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()
    const misc = globalStore.misc
    
    const sideBarLocalState = useDeepSignal({
        selectedControlId: 0,
        expandedControlId: 0,
    })
    const menu = misc.sideBarMenu.value

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                '& .Mui-selected': {
                    // for selected item to show red
                    color: 'red',
                    backgroundColor: `${theme.palette.grey[200]}!important`,
                },
            }}
            variant="persistent"
            anchor="left"
            transitionDuration={300}
            open={misc.open.value}>
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
            <SideMenuList root={menu} />
        </Drawer>
    )

    function SideMenuList({ root }: any) {
        return (
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleDrawerCloseIfRequired}>
                <List sx={{ pt: 0 }}>{getListItems(root)}</List>
            </ClickAwayListener>
        )

        function getListItems(first: any) {
            const listItems: any[] = []
            first?.children?.forEach((item: any, index: number) => {
                const listItem = (
                    <MenuItem
                        key={item.controlId + index} // In absence of index duplicate key warning appears
                        divider
                        disableGutters
                        sx={{ pt: 0, pb: 0 }}
                        selected={
                            sideBarLocalState.selectedControlId.value ===
                            item.controlId
                        }>
                        <ListItemButton
                            sx={{
                                pb: theme.spacing(1.5),
                                pt: theme.spacing(1.5),
                            }}
                            onClick={() => handleListItemButtonclick(item)}>
                            <ListItemIcon>
                                {item.iconName ? (
                                    iconMaps[item.iconName]
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
                            key={item.controlId}
                            in={
                                sideBarLocalState.expandedControlId.value ===
                                item.controlId
                            }
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
                item.controlId === sideBarLocalState.expandedControlId.value ? (
                    <ArrowDropUpIcon />
                ) : (
                    <ArrowDropDownIcon />
                )
        }
        return ret
    }

    function handleDrawerCloseIfRequired() {
        if (!isExtraLargeSizeUp) {
            if (misc.open.value) {
                globalStore.misc.open.value = false
            }
        }
    }

    function handleDrawerClose() {
        globalStore.misc.open.value = false
    }

    function handleListItemButtonclick(item: any) {
        if (item.children) {
            const expandedControlId =
                sideBarLocalState.expandedControlId.value === item.controlId
                    ? 0
                    : item.controlId
            sideBarLocalState.expandedControlId.value = expandedControlId
        } else {
            sideBarLocalState.selectedControlId.value = item.controlId
            globalStore.misc.currentComponentName.value = item.componentName
            handleDrawerCloseIfRequired()
        }
    }
}

export { AppNavigationSideBar }
