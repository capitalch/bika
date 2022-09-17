// import { useState } from '@hookstate/core'
import { getRowsWithSwappedId } from '../../misc/global-utils'
import {
    _,
    Box,
    DeleteForeverIcon,
    EditIcon,
    GridCellParams,
    GridToolbarContainer,
    IconButton,
    PrintIcon,
    Typography,
    SyncSharpIcon,
    SxProps,
    useTheme,
    GridToolbarColumnsButton,
    Checkbox,
    TextField,
    SearchIcon,
    CloseIcon,
    If,
    Then,
    GridToolbarFilterButton,
    GridToolbarExport,
    useGlobalMediaQuery,
    AddCircleIcon,
    useConfirm,
    messages,
    appGraphqlStrings,
    getPayloadFromGraphqlObject,
    useHookstate,
    appHookState,
    useAppGraphql,
    useEffect,
    useState,
    filterOn,
} from '../../misc/redirect'
import { XXGridOptions } from './app-xx-grid'

function useAppXXGrid(xxGridOptions: XXGridOptions) {
    const [, setRefresh] = useState({})
    const columns = _.cloneDeep(xxGridOptions.columns)
    const theme = useTheme()
    const confirm = useConfirm()
    const { queryGraphql } = useAppGraphql()
    const appGlobalState = useHookstate(appHookState)

    useEffect(() => {
        // const fetchData1 = xxGridOptions.fetchData || fetchData
        // xxGridOptions = {...xxGridOptions, ...{fetchData: fetchData1}}
        // xxGridOptions = Object.assign({}, xxGridOptions, {fetchData: fetchData1})
        if (xxGridOptions.xxGridState.rows.get().length === 0) {
            xxGridOptions.fetchData ? xxGridOptions.fetchData() : fetchData()
        }
        let subs1:any
        if (xxGridOptions.fetchDataIbukiMessage) {
            subs1 = filterOn(xxGridOptions.fetchDataIbukiMessage).subscribe(() => {
                xxGridOptions.fetchData
                    ? xxGridOptions.fetchData()
                    : fetchData()
            })
        }
        return(()=>{
            if(subs1){
                subs1.unsubscribe()
            }
        })

        // xxGridOptions.xxGridState.doRefresh.set(()=>fetchData)
        // xxGridOptions.exposedMethods.fetchData = fetchData
        // xxGridOptions.doRefresh = setRefresh
    }, [])

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
                                    () => setRefresh({})
                                    // xxGridOptions.editMethod
                                    //     ? xxGridOptions.editMethod(params)
                                    //     : null
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
                                    .catch(() => {})
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

    async function fetchData() {
        const gridState = xxGridOptions.xxGridState
        appGlobalState.misc.showLoadingDialog.set(true)
        const rowsViewLimit = gridState.rowsViewLimit.get()
        const searchString = gridState.searchString.get()
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
        gridState.set((oldState: any) => ({
            ...oldState,
            rows: [],
        }))
        data && gridState.rows.merge(rows)
        appGlobalState.misc.showLoadingDialog.set(false)
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

    return { columns, CustomGridToolbar, fetchData, sxStyles }
}
export { useAppXXGrid }

function CustomGridToolbar({ xxGridOptions, fetchData }: any) {
    const theme = useTheme()

    const { isMediumSizeUp, isLargeSizeUp, isSmallAndMediumSizeUp } =
        useGlobalMediaQuery()
    return (
        <GridToolbarContainer className="custom-toolbar">
            <Box className="sub-title">
                <Typography variant="subtitle2">
                    {xxGridOptions.subTitle}
                </Typography>
            </Box>

            <Box className="main-container">
                <If condition={isSmallAndMediumSizeUp}>
                    <Then>
                        <Typography className="toolbar-title">
                            {xxGridOptions.title}
                        </Typography>
                    </Then>
                </If>

                <Box className="toolbar-left-items">
                    <If condition={isMediumSizeUp}>
                        <Then>
                            <Box component="span" sx={{ ml: theme.spacing(1) }}>
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
                    <If condition={xxGridOptions.toShowViewLimit}>
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
                                    value={
                                        xxGridOptions.xxGridState.rowsViewLimit
                                            ? xxGridOptions.xxGridState.rowsViewLimit.get()
                                            : '0'
                                    }
                                    style={{
                                        width: '4rem',
                                    }}
                                    onChange={(e: any) => {
                                        xxGridOptions.xxGridState.rowsViewLimit.set(
                                            e.target.value
                                        )
                                        xxGridOptions.fetchData
                                            ? xxGridOptions.fetchData()
                                            : fetchData()
                                        // if (xxGridOptions.fetchData) {
                                        //     xxGridOptions.fetchData()
                                        // } else {
                                        //     fetchData()
                                        // }
                                    }}>
                                    <option value={'100'}>100</option>

                                    <option value={'1000'}>1000</option>

                                    <option value={'0'}>All</option>
                                </select>
                            </Box>
                        </Then>
                    </If>
                    <IconButton
                        size="medium"
                        color="primary"
                        onClick={
                            xxGridOptions.fetchData
                                ? xxGridOptions.fetchData
                                : fetchData
                        }>
                        <SyncSharpIcon></SyncSharpIcon>
                    </IconButton>
                </Box>
                <Box component="span" className="toolbar-right-items">
                    {/* Search box */}
                    <If condition={isLargeSizeUp}>
                        <Then>
                            <TextField
                                sx={{ mt: theme.spacing(1) }}
                                // inputRef={meta.current.searchTextRef}
                                variant="standard"
                                autoComplete="off"
                                // autoFocus={!meta.current.isFirstTime}
                                value={xxGridOptions.xxGridState.searchString.get()}
                                // onChange={props.onChange}
                                onChange={(e: any) => {
                                    xxGridOptions.xxGridState.searchString.set(
                                        e.target.value
                                    )
                                }}
                                placeholder="Search…"
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
                                                visibility:
                                                    xxGridOptions.xxGridState.searchString.get()
                                                        ? 'visible'
                                                        : 'hidden',
                                            }}
                                            onClick={() =>
                                                xxGridOptions.xxGridState.searchString.set(
                                                    ''
                                                )
                                            }>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Then>
                    </If>
                    <If condition={!!xxGridOptions.addMethod}>
                        <Then>
                            {/* Add Button */}
                            <IconButton
                                color="primary"
                                size="medium"
                                onClick={xxGridOptions.addMethod}>
                                <AddCircleIcon
                                    sx={{
                                        fontSize: theme.spacing(6),
                                        ml: theme.spacing(2),
                                        mr: theme.spacing(1),
                                    }}></AddCircleIcon>
                            </IconButton>
                        </Then>
                    </If>
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
