import {
    _,
    Box,
    Button,
    DeleteForeverIcon,
    EditIcon,
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
} from '../../misc/redirect'
import { XXGridOptions } from './app-xx-grid'

function useAppXXGrid(xxGridOptions: XXGridOptions) {
    // const [columns, setColumns] = useState(xxGridOptions.columns)
    // const columns = useHookstate(xxGridOptions.columns)
    const columns = _.cloneDeep(xxGridOptions.columns)
    const theme = useTheme()
    injectStyles()
    insertDeleteColumn()
    insertEditColumn()
    insertPrintPreviewColumn()

    function CustomGridToolbar(props: any) {
        return (
            <GridToolbarContainer className="custom-toolbar">
                <Box className="sub-title">
                    <Typography variant="subtitle2">{xxGridOptions.subTitle}</Typography>
                </Box>
                <Box className="main-container">
                    <Box className="toolbar-left-items">
                        <Typography className="toolbar-title">
                            {xxGridOptions.title}
                        </Typography>
                        {/* <div>
                            {xxGridOptions.hideColumnsButton ? undefined : (
                                <GridToolbarColumnsButton color="secondary" />
                            )}
                            {xxGridOptions.hideFiltersButton ? undefined : (
                                <GridToolbarFilterButton color="secondary" />
                            )}
                            {xxGridOptions.hideExportButton ? undefined : (
                                <GridToolbarExport color="secondary" />
                            )}
                        </div> */}

                        {/* {xxGridOptions.hideFilteredButton ? undefined : (
                            <Button
                                variant="text"
                                color="secondary"
                                onClick={() => {
                                    onFilteredClick()
                                    meta.current.isMounted && setRefresh({})
                                }}>
                                Filtered
                            </Button>
                        )}
                        <IconButton
                            className={classes.syncSharpButton}
                            size="medium"
                            color="secondary"
                            onClick={(e: any) => {
                               
                            }}>
                            <SyncSharpIcon></SyncSharpIcon>
                        </IconButton>
                        {!!!xxGridOptions.hideViewLimit && (
                            <div className="view-limit">
                                <span>View</span>
                                <select
                                    value={meta.current.viewLimit || ''}
                                    style={{
                                        fontSize: '0.8rem',
                                        width: '4rem',
                                        marginLeft: '0.1rem',
                                    }}
                                    onChange={(e: any) => {
                                        meta.current.viewLimit = e.target.value
                                        fetchRows(sqlQueryId, sqlQueryArgs)
                                        meta.current.isMounted && setRefresh({})
                                    }}>
                                    <option value={'100'}>100</option>
                                    <option value={'1000'}>1000</option>
                                    <option value={'0'}>All</option>
                                </select>
                            </div>
                        )}
                        {!!xxGridOptions.toShowReverseCheckbox && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={meta.current.isReverseOrder}
                                        onChange={(e: any) => {
                                            meta.current.isReverseOrder =
                                                e.target.checked
                                            toggleOrder()
                                            meta.current.isMounted &&
                                                setRefresh({})
                                        }}
                                    />
                                }
                                label="Reverse"
                            />
                        )}
                        {!!xxGridOptions.toShowDailySummary && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={meta.current.isDailySummary}
                                        onChange={(e: any) => {
                                            meta.current.isDailySummary =
                                                e.target.checked
                                            injectDailySummary()
                                        }}
                                    />
                                }
                                label="Daily summary"
                            />
                        )}
                        {!!xxGridOptions.toShowColumnBalanceCheckBox && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={meta.current.isColumnBalance}
                                        onChange={(e: any) => {
                                            meta.current.isColumnBalance =
                                                e.target.checked
                                            fillColumnBalance()
                                            meta.current.isMounted &&
                                                setRefresh({})
                                        }}
                                    />
                                }
                                label="Col balance"
                            />
                        )} */}
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

                        
                        <TextField
                            inputRef={meta.current.searchTextRef}
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
                                            checked={pre.isSearchTextOr}
                                            onClick={
                                                handleOnClickSearchCheckbox
                                            }
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
                        />
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
            // setColumns((old: any[]) => {
            //     old.unshift(editColumn)
            //     return [...old]
            // })
            // setColumns(immer((draft:any)=>{
            //     draft.unshift(editColumn)
            //     return(draft)
            // }))
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
            color: theme.palette.secondary.main,
            fontWeight: 'bolder',
        },
        '& .custom-toolbar':{
            display:'flex',
            flexDirection:'column',
            borderBottom: '1px solid lightGrey',
            padding: 0,

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
                justifyContent: 'space-between',
            },

            '& .toolbar-left-items': {
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                columnGap: theme.spacing(0.5),
                '& .toolbar-title': {
                    color: 'grey',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    marginBottom: theme.spacing(0.4),
                },
                '& .view-limit': {
                    display: 'flex',
                    columnGap: '0.5rem',
                    color: theme.palette.secondary.main,
                    marginRight: '1rem',
                    '& select': {
                        borderColor: 'grey',
                        color: theme.palette.primary.main,
                    },
                },
            },
        }
    }

    return { columns, CustomGridToolbar, sxStyles }
}
export { useAppXXGrid }
