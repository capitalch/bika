import { getRowsWithSwappedId } from '../../misc/global-utils'

import {
    _,
    Box,
    DeleteForeverIcon,
    EditIcon,
    globalStore,
    GridCellParams,
    IconButton,
    PrintIcon,
    SxProps,
    useTheme,
    useConfirm,
    messages,
    appGraphqlStrings,
    getPayloadFromGraphqlObject,
    useAppGraphql,
    useEffect,
    filterOn,
    debounceFilterOn,
    ibukiMessages,
    useState,
} from '../../misc/redirect'
import { XXGridOptions } from './xx-grid'

function useXXGrid(xxGridOptions: XXGridOptions) {
    const columns = _.cloneDeep(xxGridOptions.columns)
    const theme = useTheme()
    const confirm = useConfirm()
    const { queryGraphql } = useAppGraphql()
    const [filteredRows, setFilteredRows] = useState([])

    useEffect(() => {
        if (xxGridOptions.xxGridState.rows.value.length === 0) {
            xxGridOptions.fetchData ? xxGridOptions.fetchData() : fetchData()
        } else {
            requestSearch()
        }
        let subs1: any
        if (xxGridOptions.fetchDataIbukiMessage) {
            subs1 = filterOn(xxGridOptions.fetchDataIbukiMessage).subscribe(() => {
                xxGridOptions.fetchData
                    ? xxGridOptions.fetchData()
                    : fetchData()
            })
        }
        const subs2 = debounceFilterOn(ibukiMessages.xxGridSearchDebounce).subscribe(
            (d: any) => {
                requestSearch()
            }
        )
        return (() => {
            if (subs1) {
                subs1.unsubscribe()
            }
            subs2.unsubscribe()
        })
    }, [])
    preProcess()

    async function fetchData() {
        const gridState = xxGridOptions.xxGridState
        globalStore.misc.showLoadingDialog = true
        const rowsViewLimit = gridState.rowsViewLimit.value
        const q = appGraphqlStrings['genericView']({
            sqlKey: xxGridOptions.sqlKey,
            args: {
                ...(xxGridOptions.sqlArgs || {}),
                ...{ no: rowsViewLimit },
            },
        })
        const ret = await queryGraphql(q)
        const data: any[] = getPayloadFromGraphqlObject(ret, 'genericView')
        const rows: any = getRowsWithSwappedId(data)
        gridState.rows.value = rows
        requestSearch()
        globalStore.misc.showLoadingDialog = false
    }

    function preProcess() {
        injectStyles()
        insertDeleteColumn()
        insertEditColumn()
        insertPrintPreviewColumn()
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
                                    onClick={
                                        () =>
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
                                onClick={() => {
                                    const options = {
                                        description: messages.messConfirmDelete,
                                        confirmationText: 'Yes',
                                        cancellationText: 'No',
                                    }
                                    confirm(options)
                                        .then(() => {
                                            if (xxGridOptions.deleteMethod) {
                                                xxGridOptions.deleteMethod(params)
                                            }
                                        })
                                        .catch(() => { })
                                }}
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
    }

    async function requestSearch() {
        const gridState = xxGridOptions.xxGridState
        const searchString = xxGridOptions.xxGridState.searchString.value
        const arr = searchString.toLowerCase().split(/\W/).filter((x: any) => x) // filter used to remove emty elements
        const fRows = gridState.rows.value.filter((row: any) => arr.every((x: string) => Object.values(row).toString().toLowerCase().includes(x.toLowerCase())))
        setFilteredRows(fRows)
    }

    const sxStyles: SxProps = {
        '& .header-style': {
            color: theme.palette.primary.light,
            fontWeight: 'bold',
        },
        '& .custom-toolbar': {
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid lightGrey',
            padding: 0,
            pr: theme.spacing(2),
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
                // border:'1px solid red',
                height: theme.spacing(5),
                alignItems: 'center',
                '& .toolbar-title': {
                    color: theme.palette.text.secondary,
                    fontSize: theme.spacing(2.1),
                    fontWeight: 'bold',
                },
                '& .toolbar-left-items': {
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                },
                '& .toolbar-right-items': {
                    ml: 'auto',
                },
            },
        },
    }

    return { columns, fetchData, filteredRows, requestSearch, sxStyles }
}
export { useXXGrid }
