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
    useRef,
    useState,
    filterOn,
    debounceFilterOn,
    ibukiMessages,
    debounceEmit,
} from '../../misc/redirect'
import { XXGridOptions } from './app-xx-grid'
import { none } from '@hookstate/core'
import {useSnapshot} from 'valtio'

function useAppXXGrid(xxGridOptions: XXGridOptions) {
    const [, setRefresh] = useState({})
    const meta: any = useRef({
        rows: []
    })
    const columns = _.cloneDeep(xxGridOptions.columns)
    const theme = useTheme()
    const confirm = useConfirm()
    const { queryGraphql } = useAppGraphql()
    const appGlobalState = useHookstate(appHookState)
    const snap = useSnapshot(xxGridOptions.xxGridState)
    useEffect(() => {
        // const fetchData1 = xxGridOptions.fetchData || fetchData
        // xxGridOptions = {...xxGridOptions, ...{fetchData: fetchData1}}
        // xxGridOptions = Object.assign({}, xxGridOptions, {fetchData: fetchData1})
        if (snap.rows.length === 0) {
            xxGridOptions.fetchData ? xxGridOptions.fetchData() : fetchData()
        }
        let subs1: any
        // if (xxGridOptions.fetchDataIbukiMessage) {
        //     subs1 = filterOn(xxGridOptions.fetchDataIbukiMessage).subscribe(() => {
        //         xxGridOptions.fetchData
        //             ? xxGridOptions.fetchData()
        //             : fetchData1()
        //     })
        // }
        const subs2 = debounceFilterOn(ibukiMessages.xxGridSearchDebounce).subscribe(
            (d: any) => {
                fetchData()
            }
        )
        return (() => {
            if (subs1) {
                subs1.unsubscribe()
            }
            subs2.unsubscribe()
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

    async function fetchData() {
        const gridState = xxGridOptions.xxGridState
        appGlobalState.misc.showLoadingDialog.set(true)
        const rowsViewLimit = gridState.rowsViewLimit
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
        meta.current.rows = rows
        const filteredRows: any = rows.map((x: any) => ({ ...x }))

        gridState.rows = rows
        // let r = gridState.rows.get()
        // if (data.length > 0) {
        //     gridState.rows.merge(filteredRows)
        // }
        // r = gridState.rows.get()
        // gridState.merge({rows:[]})
        // gridState.rows.set([])
        appGlobalState.misc.showLoadingDialog.set(false)
    }
    // let r = gridState.rows.get()
    // gridState.set((oldState: any) => ({
    //     ...oldState,
    //     rows: [],
    // }))

    async function fetchData1() {
        const gridState = xxGridOptions.xxGridState
        appGlobalState.misc.showLoadingDialog.set(true)
        const rowsViewLimit = gridState.rowsViewLimit.get()
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
        meta.current.rows = rows
        const filteredRows: any = rows.map((x: any) => ({ ...x }))
        // gridState.nested('rows').value = [] //NW
        // gridState.nested('rows').set([]) //NW
        // gridState.nested('rows').set([{clientName:'abc', dbName:'ccc', id:1, id1:1, isActive:true, jData: null, remarks:'abc', shortCode:'sss', timestamp:'Tue, 13 Sep 2022 13:15:28 GMT'}]) //nw
        // gridState.nested('rows').set(()=>[{clientName:'abc', dbName:'ccc', id:1, id1:1, isActive:true, jData: null, remarks:'abc', shortCode:'sss', timestamp:'Tue, 13 Sep 2022 13:15:28 GMT'}]) //nw
        // gridState.rows.set(()=>[]) //nw
        gridState.merge({ rows: [] }) //nw
        // setRefresh({})
        // gridState.merge({rows:[]}) //nw
        // gridState.rows.nested(0).set(none)
        // gridState.rows.nested(0).set(none)
        // gridState.rows.merge([
        //     { clientName: 'abc', dbName: 'ccc', id: 3, id1: 1, isActive: true, jData: null, remarks: 'abc', shortCode: 'sss', timestamp: 'Tue, 13 Sep 2022 13:15:28 GMT' },
        //     { clientName: 'abc', dbName: 'ccc', id: 4, id1: 1, isActive: true, jData: null, remarks: 'abc', shortCode: 'sss', timestamp: 'Tue, 13 Sep 2022 13:15:28 GMT' },
        //     { clientName: 'abc', dbName: 'ccc', id: 5, id1: 1, isActive: true, jData: null, remarks: 'abc', shortCode: 'sss', timestamp: 'Tue, 13 Sep 2022 13:15:28 GMT' }
        // ]) //w

        // gridState.rows[0].set(none)
        // gridState.rows.merge({0:none})
        // gridState.rows[1].set(none)
        // gridState.rows[2].set(none)
        // gridState.rows[3].set(none)

        // rws.set(()=>[ {clientName:'abc', dbName:'ccc', id:3, id1:1, isActive:true, jData: null, remarks:'abc', shortCode:'sss', timestamp:'Tue, 13 Sep 2022 13:15:28 GMT'}])
        // gridState.rows.set(()=>[])//nw
        // gridState.set({rows:[]}) //nw
        // gridState.set({rows:Array(4)})
        // gridState.rows.merge(filteredRows)
        // gridState.rows.set([])
        // if (data.length > 0) {
        //     gridState.rows.merge(filteredRows)
        // }
        // gridState.rows.set([])
        appGlobalState.misc.showLoadingDialog.set(false)
    }

    function anotherRequestSearch() {
        // xxGridOptions.xxGridState.rows.set([])
        requestSearch()
    }

    async function requestSearch() {
        const gridState = xxGridOptions.xxGridState
        // const searchString = xxGridOptions.xxGridState.searchString.get()
        // const rowsViewLimit = gridState.rowsViewLimit.get()




        // appGlobalState.misc.showLoadingDialog.set(true)
        // const q = appGraphqlStrings['genericView']({
        //     sqlKey: xxGridOptions.sqlKey,
        //     args: {
        //         ...(xxGridOptions.sqlArgs || {}),
        //         ...{ no: rowsViewLimit },
        //     },
        // })
        // const ret = await queryGraphql(q)
        // const data: any[] = getPayloadFromGraphqlObject(ret, 'genericView')
        // const rows: any = getRowsWithSwappedId(data)
        // meta.current.rows = rows
        // const filteredRows: any = rows.map((x: any) => ({ ...x }))


        gridState.rows.set([])
        // gridState.rows.merge([{}])
        // if (data.length > 0) {
        //     gridState.rows.merge(filteredRows)
        // }
        appGlobalState.misc.showLoadingDialog.set(false)


        // await fetchData()

        // if (searchString) {
        //     const arr = searchString.toLowerCase().split(/\W/).filter((x: any) => x) // filter used to remove emty elements
        //     // const rows: any = meta.current.rows
        //     const filteredRows = meta.current.rows.filter((row: any) => arr.every((x: string) => Object.values(row).toString().toLowerCase().includes(x.toLowerCase())))
        //     let r = gridState.rows.get()

        //     r = gridState.rows.get()
        //     r = gridState.rows.get()
        //     const x = 0
        // }
    }
    // gridState.rows.set([])
    // gridState.set((oldState: any) => ({
    //     ...oldState,
    //     rows: [],
    // }))
    // gridState.rows.merge(filteredRows)
    // gridState.merge({rows:filteredRows})
    // gridState.nested('rows').set([])
    // gridState.rows.set([])

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

    return { columns, CustomGridToolbar, fetchData, fetchData1, requestSearch, sxStyles }
}
export { useAppXXGrid }

function CustomGridToolbar({ xxGridOptions, fetchData, requestSearch, fetchData1 }: any) {
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
                                            ? xxGridOptions.xxGridState.rowsViewLimit
                                            : '0'
                                    }
                                    style={{
                                        width: '4rem',
                                    }}
                                    onChange={(e: any) => {
                                        xxGridOptions.xxGridState.rowsViewLimit =
                                            e.target.value
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
                                value={xxGridOptions.xxGridState.searchString}
                                // onChange={props.onChange}
                                onChange={(e: any) => {
                                    xxGridOptions.xxGridState.searchString.set(
                                        e.target.value
                                    )
                                    debounceEmit(ibukiMessages.xxGridSearchDebounce, '')
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
                                                    xxGridOptions.xxGridState.searchString
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
                                onClick={
                                    // xxGridOptions.addMethod
                                    () => {
                                        xxGridOptions.xxGridState.searchString.set(
                                            'b'
                                        )
                                        fetchData1()
                                    }
                                }>
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
