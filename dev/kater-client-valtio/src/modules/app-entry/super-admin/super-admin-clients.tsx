import { XXGrid } from '../../../common/components/xx-grid/xx-grid'
import {
    Box,
    Button,
    emit,
    ibukiMessages,
    showDialog,
} from '../../../common/misc/redirect'
// import { globalStore } from '../../../stores/global-store'
import { useSnapshot } from 'valtio'
import { SuperAdminClientForm } from './super-admin-clients-form'
import { superAdminStore } from '../../../stores/super-admin-store'

function SuperAdminClients() {
    const xxGridState = superAdminStore.clients.xxGridState
    useSnapshot(xxGridState)
    return (
        <Box>
            <Button
                onClick={() => {
                    emit(ibukiMessages.superAdminClientsXXGridFetchData, '')
                }}>
                Fetch data
            </Button>
            <XXGrid
                columns={getColumns()}
                addMethod={addMethod}
                deleteMethod={deleteMethod}
                editMethod={editMethod}
                // fetchData={fetchData}
                fetchDataIbukiMessage={ibukiMessages.superAdminClientsXXGridFetchData}
                toShowViewLimit={true}
                isToolbarColumnsButton={true}
                isToolbarExportButton={true}
                isToolbarFilterButton={true}
                printPreviewMethod={printPreviewMethod}
                isCheckBoxSelection={true}
                xxGridState={xxGridState}
                title="Super admin clients"
                sqlKey="get-clients"
                subTitle="All clients for the current app"
            />
        </Box>
    )

    function addMethod() {
        superAdminStore.clients.resetForm()
        superAdminStore.clients.form.isEditMode= false
        showDialog({
            title:'New client',
            content:SuperAdminClientForm
        })
    }

    function editMethod(params: any) {
        const row = params.row
        superAdminStore.clients.resetForm()
        const clientForm = superAdminStore.clients.form
        clientForm.id = row.id1
        clientForm.isEditMode = true
        clientForm.clientName = row.clientName
        clientForm.shortCode = row.shortCode
        clientForm.remarks = row.remarks
        showDialog({
            title:'Edit client',
            content:SuperAdminClientForm
        })
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
export { SuperAdminClients }
