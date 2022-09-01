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
    styled,
    Typography,
    useGlobalMediaQuery,
    useHookstate,
    useRef,
    useState,
    useTheme,
} from '../../misc/redirect'

import {
    BusinessIcon,
    HomeIcon,
    MiscellaneousServicesIcon,
    ReportIcon,
    SettingsIcon,
    SettingsApplicationsIcon,
    SummarizeIcon,
    ViewListIcon,
} from '../../misc/redirect'
import { appMainHookState } from '../../hook-state/app-hookstate'
import { CateringHome } from '../../entities/catering/components/catering_home'

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
    const theme = useTheme()
    const [, setRefresh] = useState({})
    const { isExtraLargeSizeUp } = useGlobalMediaQuery()
    const appMainGlobalState = useHookstate(appMainHookState)
    const menu = appMainGlobalState.selectedMenu.get()
    // const meta:any = useRef({
    //     openArray:Array(menu.children.length).fill(false)
    // })
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
            <MenuList root={menu} />
        </Drawer>
    )

    function getArrowUpDownIcon(item: any, index: number) {
        let ret = undefined
        if (item.children) {
            ret =
                openArray[index] === true ? (
                    // meta.current.openArray[index] === true ? (
                    <ArrowDropUpIcon />
                ) : (
                    <ArrowDropDownIcon />
                )
        }
        return ret
    }

    function MenuList({ root }: any) {
        // const [, setRefresh] = useState({})
        return (
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleDrawerCloseIfRequired}>
                <List>{getListItems(root)}</List>
            </ClickAwayListener>
        )

        function getListItems(first: any, isNested = false) {
            const listItems: any[] = []
            first?.children?.forEach((item: any, index: number) => {
                const listItem = (
                    <ListItem divider key={index} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                const newArr = immer(
                                    openArray,
                                    (draft: any[]) => {
                                        const temp = draft[index]
                                        draft.fill(false)
                                        draft[index] = !temp
                                    }
                                )
                                setOpenArray(newArr)

                                if (!item.children) {
                                    appMainGlobalState.currentComponentName.set(item.componentName)
                                    handleDrawerCloseIfRequired()
                                }
                                // setRefresh({})
                            }}>
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
                            // orientation='vertical'
                            // easing='10000'
                            // component='div'
                            unmountOnExit>
                            {/* <Divider /> */}
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

    function handleDrawerCloseIfRequired() {
        if (!isExtraLargeSizeUp) {
            if (appMainGlobalState.open.get()) {
                appMainGlobalState.open.set(false)
            }
        }
    }

    function handleClickAway() {}
    function handleDrawerClose() {
        appMainGlobalState.open.set(false)
    }
}
export { AppMainSideBar }

const iconMapping: any = {
    home: <HomeIcon />,
    masters: <ViewListIcon />,
    misc: <MiscellaneousServicesIcon />,
    globalSettings: <SettingsIcon />,
    branchSettings: <SettingsApplicationsIcon />,
    companyInfo: <BusinessIcon />,
    reports: <ReportIcon />,
    reports1: <SummarizeIcon />,
}



// const temp = openArray[index]
// const newArr: any[] = [...openArray].fill(false)
// newArr[index] = !temp
// setOpenArray(newArr)
// setOpenArray((old:any[])=>{
//     const temp = old[index]
//     const newArr:any[] = [...old].fill(false)
//     newArr[index] = !temp
//     return(newArr)
// })
//
// const temp = meta.current.openArray[index]
// meta.current.openArray.fill(false)
// meta.current.openArray[index] = !temp
// setRefresh({})
