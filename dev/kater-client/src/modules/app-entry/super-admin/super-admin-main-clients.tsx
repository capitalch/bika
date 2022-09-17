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
    useState,
    useTheme,
} from '../../../misc/redirect'
import { getRowsWithSwappedId } from '../../../misc/global-utils'

function SuperAdminMainClients() {
    const { queryGraphql } = useAppGraphql()
    const appGlobalState = useHookstate(appHookState)
    const xxGridState: any = appGlobalState.superAdmin.clients.xxGridHookstate
    const theme = useTheme()

    // useEffect(() => {}, [])

    return (
        <Box>
            <Button
                onClick={() => {
                    emit(ibukiMessages.xxGridFetchData, '')
                }}>
                Fetch data
            </Button>
            <AppXXGrid
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
                sqlKey="get-clients"
                subTitle="Subtitle of grid"
            />
        </Box>
    )

    function addMethod() {
        console.log('add')
    }

    function editMethod(params: any) {
        console.log(params.row.clientName)
    }

    function deleteMethod(params: any) {}

    function printPreviewMethod(params: any) {}

    async function fetchData() {
        // const clients = xxGridGlobalState.superAdmin.clients
        appGlobalState.misc.showLoadingDialog.set(true)
        const rowsViewLimit = xxGridState.rowsViewLimit.get()
        // const searchString = xxGridState.searchString.get()
        const q = appGraphqlStrings['genericView']({
            sqlKey: 'get-clients',
            args: { no: rowsViewLimit },
        })
        const ret = await queryGraphql(q)
        const data: any[] = getPayloadFromGraphqlObject(ret, 'genericView')
        const rows: any = getRowsWithSwappedId(data)

        xxGridState.set((oldState: any) => ({
            ...oldState,
            rows: [],
        }))
        data && xxGridState.rows.merge(rows)
        appGlobalState.misc.showLoadingDialog.set(false)
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
