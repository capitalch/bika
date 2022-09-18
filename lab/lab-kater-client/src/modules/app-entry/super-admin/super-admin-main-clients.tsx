import { AppXXGrid } from '../../../components/app-common/app-xx-grid'
import {
    appGraphqlStrings,
    appHookState,
    Box,
    Button,
    Container,
    DataGridPro,
    Else,
    emit,
    getPayloadFromGraphqlObject,
    ibukiMessages,
    If,
    immer,
    Tab,
    TabContext,
    TabList,
    TabPanel,
    Tabs,
    Then,
    Typography,
    useAppGraphql,
    useConfirm,
    useEffect,
    useHookstate,
    // useState,
    useTheme,
} from '../../../misc/redirect'
import { useState, } from '@hookstate/core'
import { getRowsWithSwappedId } from '../../../misc/global-utils'
import { globalState } from '../../../global-state/valtio-state'
import { useSnapshot } from 'valtio'
function SuperAdminMainClients() {
    const { queryGraphql } = useAppGraphql()
    const appGlobalState = useHookstate(appHookState)
    // const xxGridState: any = appGlobalState.superAdmin.clients //.xxGridHookstate
    const xxGridState = globalState
    const theme = useTheme()
    const snap = useSnapshot(globalState)
    useEffect(() => {
        fetchData()
    }, [])
    let sqlKey = 'get-clients'
    // const rws = [{
    //     clientName: 'aaa'
    //     , dbName: 'aaa'
    //     , id: 1
    //     , id1: 1
    //     , isActive: true
    //     , jData: null
    //     , remarks: 'aa'
    //     , shortCode: '222'
    //     , timestamp: '123456'
    // }]
    // globalState.rows.push({
    //     clientName: 'aaa'
    //     , dbName: 'aaa'
    //     , id: 1
    //     , id1: 1
    //     , isActive: true
    //     , jData: null
    //     , remarks: 'aa'
    //     , shortCode: '222'
    //     , timestamp: '123456'
    // })
    return (
        <Box>
            <Button
                onClick={() => {
                    sqlKey = 'get-clients1'
                    emit(ibukiMessages.xxGridFetchData, '')
                }}>
                Fetch data
            </Button>
            <DataGridPro
                autoHeight={true}
                checkboxSelection={true}
                columns={getColumns()}
                density="compact"
                disableColumnMenu={true}
                disableSelectionOnClick={true}
                rows={snap.rows}
                showCellRightBorder={true}
                showColumnRightBorder={true}
            // sx={sxStyles}
            // components={{
            //     Toolbar: CustomGridToolbar,
            // }}
            // componentsProps={{
            //     toolbar: { xxGridOptions: xxGridOptions, fetchData: fetchData, requestSearch: requestSearch, fetchData1: fetchData1 },
            // }}
            />
            {/* <AppXXGrid
                columns={getColumns()}
                addMethod={addMethod}
                deleteMethod={deleteMethod}
                editMethod={editMethod}
                // fetchData={fetchData}
                fetchDataIbukiMessage={ibukiMessages.xxGridFetchData}
                toShowViewLimit={true}
                isToolbarColumnsButton={true}
                isToolbarExportButton={true}
                isToolbarFilterButton={true}
                printPreviewMethod={printPreviewMethod}
                isCheckBoxSelection={true}
                xxGridState={xxGridState}
                title="Persistent datagrid"
                sqlKey={sqlKey}
                subTitle="Subtitle of grid"
            /> */}
        </Box>
    )

    function addMethod() {
        console.log('add')
    }

    function editMethod(params: any) {
        console.log(params.row.clientName)
    }

    function deleteMethod(params: any) { }

    function printPreviewMethod(params: any) { }

    async function fetchData() {
        // const clients = xxGridGlobalState.superAdmin.clients
        // appGlobalState.misc.showLoadingDialog.set(true)
        // const rowsViewLimit = snap.rowsViewLimit
        // const searchString = xxGridState.searchString.get()
        // const q = appGraphqlStrings['genericView']({
        //     sqlKey: 'get-clients',
        //     args: { no: rowsViewLimit },
        // })
        // const ret = await queryGraphql(q)
        // const data: any[] = getPayloadFromGraphqlObject(ret, 'genericView')
        // const rows: any = getRowsWithSwappedId(data)
        globalState.rows.push({
            clientName: 'aaaf'
            , dbName: 'aaa'
            , id: 2
            , id1: 1
            , isActive: true
            , jData: null
            , remarks: 'aa'
            , shortCode: '222'
            , timestamp: '123456'
        })
        // xxGridState.set((oldState: any) => ({
        //     ...oldState,
        //     rows: [],
        // }))
        // data && xxGridState.rows.merge(rows)
        // appGlobalState.misc.showLoadingDialog.set(false)
    }

    function getColumns() {
        return [
            {
                headerName: '#',
                width: 60,
                field: 'id',
            },
            {
                headerName: 'Name',
                width: 160,
                field: 'clientName',
                headerClassName: 'header-class',
            },
            {
                headerName: 'Short code',
                width: 120,
                field: 'shortCode',
            },
            {
                headerName: 'Remarks',
                width: 140,
                field: 'remarks',
            },
            {
                headerName: 'Database name',
                width: 120,
                field: 'dbName',
            },
            {
                headerName: 'Active',
                width: 80,
                type: 'boolean',
                field: 'isActive',
            },
            {
                headerName: 'Time created',
                flex: 1,
                field: 'timestamp',
            },
        ]
    }
}
export { SuperAdminMainClients }
