import { XXGrid } from '../../../common/app-components/xx-grid/xx-grid'
import {
    Box,
    Button,
    emit,
    ibukiMessages,
} from '../../../shared-utils/redirect'
import { globalStore } from '../../../global-store/global-store'
import { useSnapshot } from 'valtio'

function SuperAdminMainClients() {
    const xxGridState = globalStore.superAdmin.clients.xxGridState
    useSnapshot(xxGridState) // This is undocumented. But this is necessary otherwise no data displayed
    return (
        <Box>
            <Button
                onClick={() => {
                    emit(ibukiMessages.xxGridFetchData, '')
                }}>
                Fetch data
            </Button>
            <XXGrid
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

    function deleteMethod(params: any) { }

    function printPreviewMethod(params: any) { }

    // async function fetchData() {
    //     const clients = xxGridglobalStore.superAdmin.clients
    //     appglobalStore.misc.showLoadingDialog.set(true)
    //     const rowsViewLimit = xxGridState.rowsViewLimit.get()
    //     const searchString = xxGridState.searchString.get()
    //     const q = appGraphqlStrings['genericView']({
    //         sqlKey: 'get-clients',
    //         args: { no: rowsViewLimit },
    //     })
    //     const ret = await queryGraphql(q)
    //     const data: any[] = getPayloadFromGraphqlObject(ret, 'genericView')
    //     const rows: any = getRowsWithSwappedId(data)

    //     // xxGridState.set((oldState: any) => ({
    //     //     ...oldState,
    //     //     rows: [],
    //     // }))
    //     // data && xxGridState.rows.merge(rows)
    //     appglobalStore.misc.showLoadingDialog.set(false)
    // }

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
