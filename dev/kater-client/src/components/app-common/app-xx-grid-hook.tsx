import {
    _,
    Box,
    Button,
    DeleteForeverIcon,
    EditIcon,
    Else,
    GridCellParams,
    GridToolbarContainer,
    IconButton,
    immer,
    PrintIcon,
    Typography,
    SyncSharpIcon,
    SxProps,
    useHookstate,
    useTheme,
    useState,
    GridToolbarColumnsButton,
    FormControlLabel,
    Checkbox,
    TextField,
    SearchIcon,
    CloseIcon,
    useLayoutEffect,
    If,
    Then,
    GridToolbarFilterButton,
    GridToolbarExport,
    useGlobalMediaQuery,
    AddCircleIcon,
} from '../../misc/redirect'
import { XXGridOptions } from './app-xx-grid'

function useAppXXGrid(xxGridOptions: XXGridOptions) {
    // const [columns, setColumns] = useState(xxGridOptions.columns)
    // const columns = useHookstate(xxGridOptions.columns)
    const columns = _.cloneDeep(xxGridOptions.columns)
    const theme = useTheme()
    const { isMediumSizeUp,isLargeSizeUp, isSmallAndMediumSizeUp } = useGlobalMediaQuery()

    injectStyles()
    insertDeleteColumn()
    insertEditColumn()
    insertPrintPreviewColumn()

    function CustomGridToolbar(props: any) {
        // const toolbarState = useHookstate({viewLimit:100, searchString:''})
        return (
            <GridToolbarContainer className="custom-toolbar">
                <Box className="sub-title">
                    <Typography variant="subtitle2">
                        {xxGridOptions.subTitle}
                    </Typography>
                </Box>

                <Box className="main-container">
                    <Typography className="toolbar-title">
                        {xxGridOptions.title}
                    </Typography>
                    <Box className="toolbar-left-items">
                        <If condition={isMediumSizeUp}>
                            <Then>
                                <Box
                                    component="span"
                                    sx={{ ml: theme.spacing(1) }}>
                                    <If
                                        condition={
                                            xxGridOptions.isToolbarColumnsButton
                                        }>
                                        <Then>
                                            <GridToolbarColumnsButton color="primary" />
                                        </Then>
                                    </If>
                                    <If
                                        condition={
                                            xxGridOptions.isToolbarFilterButton
                                        }>
                                        <Then>
                                            <GridToolbarFilterButton color="primary" />
                                        </Then>
                                    </If>
                                    <If
                                        condition={
                                            xxGridOptions.isToolbarExportButton
                                        }>
                                        <Then>
                                            <GridToolbarExport color="primary" />
                                        </Then>
                                    </If>

                                </Box>
                            </Then>
                        </If>
                        <If
                            condition={
                                xxGridOptions.toShowViewLimit
                            }>
                            <Then>
                                <Box
                                    component="span"
                                    sx={{ ml: theme.spacing(1) }}
                                    className="view-limit">
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{
                                            mr: theme.spacing(0.5),
                                        }}>
                                        View
                                    </Typography>
                                    <select
                                        value={xxGridOptions.sharedXXGridHookstate.rowsViewLimit.get() || ''}
                                        style={{
                                            width: '4rem',
                                        }}
                                        onChange={(e: any) => {
                                            xxGridOptions.sharedXXGridHookstate.rowsViewLimit.set(e.target.value)
                                            xxGridOptions.fetchData()
                                        }}>
                                        <option value={'100'}>
                                            100
                                        </option>

                                        <option value={'1000'}>
                                            1000
                                        </option>

                                        <option value={'0'}>
                                            All
                                        </option>
                                    </select>
                                </Box>
                            </Then>
                        </If>
                        <IconButton
                            size="medium"
                            color="primary"
                            onClick={xxGridOptions.fetchData}>
                            <SyncSharpIcon></SyncSharpIcon>
                        </IconButton>

                    </Box>
                    <Box component='span' sx={{ ml: 'auto' }}>
                        {/* Search box */}
                        <If condition={isLargeSizeUp}>
                            <Then>
                                <TextField
                                    sx={{ mt: theme.spacing(1) }}
                                    // inputRef={meta.current.searchTextRef}
                                    variant="standard"
                                    autoComplete="off"
                                    // autoFocus={!meta.current.isFirstTime}
                                    value={props.value}
                                    onChange={props.onChange}
                                    placeholder="Search…"
                                    className="global-search"
                                    InputProps={{
                                        startAdornment: (
                                            <>
                                                <Checkbox
                                                    // checked={pre.isSearchTextOr}
                                                    // onClick={
                                                    //     handleOnClickSearchCheckbox
                                                    // }
                                                    size="small"
                                                />
                                                <SearchIcon fontSize="small" />
                                            </>
                                        ),
                                        endAdornment: (
                                            <IconButton
                                                title="Clear"
                                                aria-label="Clear"
                                                size="small"
                                                style={{
                                                    visibility: props.value
                                                        ? 'visible'
                                                        : 'hidden',
                                                }}
                                                onClick={props.clearSearch}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        ),
                                    }}
                                /></Then>
                        </If>
                        {/* Add Button */}
                        <IconButton color='primary' size='large'>
                            <AddCircleIcon sx={{ fontSize: theme.spacing(6), ml: theme.spacing(2), mr: theme.spacing(4) }}></AddCircleIcon>
                        </IconButton>
                    </Box>
                    {/* <Box className="toolbar-right-items">
                        {!!xxGridOptions.toShowAddButton && (
                            <Button
                                className="add-button"
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={() =>
                                    
                                }>
                                Add
                            </Button>
                        )}

                        
                        
                    </Box> */}
                </Box>
            </GridToolbarContainer>
        )
    }

    function insertEditColumn() {
        if (xxGridOptions.editMethod) {
            const editColumn = {
                headerName: 'E',
                description: 'Edit',
                disableColumnMenu: true,
                disableExport: true,
                disablePrint: true,
                disableReorder: true,
                filterable: false,
                hideSortIcons: true,
                resizable: false,
                width: 20,
                field: '1',
                renderCell: (params: GridCellParams) => {
                    return (
                        <Box>
                            <IconButton
                                size="small"
                                color="secondary"
                                disabled={xxGridOptions.isEditDisabled}
                                onClick={() =>
                                    xxGridOptions.editMethod
                                        ? xxGridOptions.editMethod(params)
                                        : null
                                }
                                aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                        </Box>
                    )
                },
            }
            columns.unshift(editColumn)
        }
    }

    function insertPrintPreviewColumn() {
        if (xxGridOptions.printPreviewMethod) {
            const printPreviewColumn = {
                headerName: 'P',
                description: 'Print preview',
                disableColumnMenu: true,
                disableExport: true,
                disableReorder: true,
                filterable: false,
                hideSortIcons: true,
                resizable: false,
                width: 20,
                field: '2',
                renderCell: (params: GridCellParams) => {
                    return (
                        <IconButton
                            size="small"
                            color="success"
                            // className="delete"
                            disabled={!!xxGridOptions.isPrintPreviewDisabled}
                            onClick={() =>
                                xxGridOptions.printPreviewMethod
                                    ? xxGridOptions.printPreviewMethod(params)
                                    : null
                            }
                            aria-label="Print">
                            <PrintIcon />
                        </IconButton>
                    )
                },
            }
            columns.unshift(printPreviewColumn)
        }
    }

    function insertDeleteColumn() {
        if (xxGridOptions.deleteMethod) {
            const deleteColumn = {
                headerName: 'D',
                description: 'Delete forever',
                disableColumnMenu: true,
                disableExport: true,
                disableReorder: true,
                filterable: false,
                hideSortIcons: true,
                resizable: false,
                width: 20,
                field: '3',
                renderCell: (params: GridCellParams) => {
                    return (
                        <IconButton
                            size="small"
                            color="error"
                            className="delete"
                            disabled={!!xxGridOptions.isDeleteDisabled}
                            onClick={() =>
                                xxGridOptions.deleteMethod
                                    ? xxGridOptions.deleteMethod(params)
                                    : null
                            }
                            aria-label="Delete">
                            <DeleteForeverIcon />
                        </IconButton>
                    )
                },
            }
            columns.unshift(deleteColumn)
        }
    }

    function injectStyles() {
        for (const column of columns) {
            column.headerClassName = 'header-style'
        }
    }

    const sxStyles: SxProps = {
        '& .header-style': {
            color: theme.palette.primary.light,
            fontWeight: 'bolder',
        },
        '& .custom-toolbar': {
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid lightGrey',
            padding: 0,
            width: '100%',
            '& .sub-title': {
                width: '100%',
                display: 'flex',
                marginRight: theme.spacing(2),
                marginTop: theme.spacing(1),
                marginLeft: theme.spacing(2),
            },

            '& .main-container': {
                width: '100%',
                display: 'flex',
                // justifyContent: 'space-between',
                alignItems: 'center',
                '& .toolbar-title': {
                    color: theme.palette.text.secondary,
                    fontSize: theme.spacing(2.1),
                    fontWeight: 'bold',
                    // marginBottom: theme.spacing(0.4),
                },
                '& .toolbar-left-items': {
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    // border: '1px solid black',
                    // mb:theme.spacing(.5),
                    // columnGap: theme.spacing(0.5),

                    // '& .view-limit': {
                    //     display: 'flex',
                    //     columnGap: '0.5rem',
                    //     color: theme.palette.secondary.main,
                    //     marginRight: '1rem',
                    //     '& select': {
                    //         borderColor: 'grey',
                    //         color: theme.palette.primary.main,
                    //     },
                    // },
                },
            },
        },
    }

    return { columns, CustomGridToolbar, sxStyles }
}
export { useAppXXGrid }

// setColumns((old: any[]) => {
//     old.unshift(editColumn)
//     return [...old]
// })
// setColumns(immer((draft:any)=>{
//     draft.unshift(editColumn)
//     return(draft)
// }))

// !!!xxGridOptions.hideViewLimit && (
//     <div className="view-limit">
//         <span>View</span>
//         <select
//             value={meta.current.viewLimit || ''}
//             style={{
//                 fontSize: '0.8rem',
//                 width: '4rem',
//                 marginLeft: '0.1rem',
//             }}
//             onChange={(e: any) => {
//                 meta.current.viewLimit = e.target.value
//                 fetchRows(sqlQueryId, sqlQueryArgs)
//                 meta.current.isMounted && setRefresh({})
//             }}>
//             <option value={'100'}>100</option>
//             <option value={'1000'}>1000</option>
//             <option value={'0'}>All</option>
//         </select>
//     </div>
// )

// !!xxGridOptions.toShowReverseCheckbox && (
//     <FormControlLabel
//         control={
//             <Checkbox
//                 checked={meta.current.isReverseOrder}
//                 onChange={(e: any) => {
//                     meta.current.isReverseOrder =
//                         e.target.checked
//                     toggleOrder()
//                     meta.current.isMounted &&
//                         setRefresh({})
//                 }}
//             />
//         }
//         label="Reverse"
//     />
// )





// {
//     !!xxGridOptions.toShowDailySummary && (
//         <FormControlLabel
//             control={
//                 <Checkbox
//                     checked={meta.current.isDailySummary}
//                     onChange={(e: any) => {
//                         meta.current.isDailySummary =
//                             e.target.checked
//                         injectDailySummary()
//                     }}
//                 />
//             }
//             label="Daily summary"
//         />
//     )
// }
// {
//     !!xxGridOptions.toShowColumnBalanceCheckBox && (
//         <FormControlLabel
//             control={
//                 <Checkbox
//                     checked={meta.current.isColumnBalance}
//                     onChange={(e: any) => {
//                         meta.current.isColumnBalance =
//                             e.target.checked
//                         fillColumnBalance()
//                         meta.current.isMounted &&
//                             setRefresh({})
//                     }}
//                 />
//             }
//             label="Col balance"
//         />
//     )
// }