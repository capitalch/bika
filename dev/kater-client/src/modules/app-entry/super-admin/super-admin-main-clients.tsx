import { AppXXGrid } from '../../../components/app-common/app-xx-grid'
import {
    appGraphqlStrings,
    appHookState,
    Box,
    Button,
    Container,
    DataGridPro,
    Else,
    getPayloadFromGraphqlObject,
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
    useEffect,
    useHookstate,
    useState,
    useTheme,
} from '../../../misc/redirect'
import { getRowsWithSwappedId } from '../../../misc/global-utils'

function SuperAdminMainClients() {
    const { queryGraphql } = useAppGraphql()
    const appGlobalState = useHookstate(appHookState)
    const theme = useTheme()
    const clients = appGlobalState.superAdmin.clients
    useEffect(() => {
        if (clients.rows.get().length === 0) {
            fetchData()
        }
    }, [])
    return (
        <If condition={clients.rows.get().length > 0}>
            <Then>
                <AppXXGrid
                    columns={getColumns()}
                    deleteMethod={deleteMethod}
                    editMethod={editMethod}
                    rows={appGlobalState.superAdmin.clients.rows.get()}
                />
            </Then>
            <Else>
                <Typography variant='body1'>No data</Typography>
            </Else>
        </If>

        // <DataGridPro sx={{'& .header-class':{color:theme.palette.primary.main,  fontWeight:'bolder', fontSize: theme.spacing(1.8)}}}
        //     columns={getColumns()}
        //     density='compact'
        //     rows={appGlobalState.superAdmin.clients.rows.get()}
        //     showCellRightBorder={true}
        //     showColumnRightBorder={true}
        //     autoHeight= {true}
        // />
    )


    function editMethod(params: any) {
        console.log(params.row.clientName)
        // const x = row.row.clientName.get()
    }

    function deleteMethod(id: number) {

    }

    async function fetchData() {
        let i = 0
        const q = appGraphqlStrings['genericView']({ sqlKey: 'get-clients' })
        const ret = await queryGraphql(q)
        const data: any[] = getPayloadFromGraphqlObject(ret, 'genericView')
        const rows: any = getRowsWithSwappedId(data)

        clients.set({ rows: [] })
        data && clients.rows.merge(rows)
        // data && clients.rows.set(()=>rows.get())
        // // const nrows = clients.rows.get()

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
