import { AppXXGrid } from '../../../components/app-common/app-xx-grid'
import {
    appGraphqlStrings,
    appHookState,
    Box,
    Button,
    Container,
    DataGridPro,
    getPayloadFromGraphqlObject,
    Tab,
    TabContext,
    TabList,
    TabPanel,
    Tabs,
    Typography,
    useAppGraphql,
    useEffect,
    useHookstate,
    useState,
    useTheme,
} from '../../../misc/redirect'

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
        <AppXXGrid
            sx={{ '& .custom-header': { color: 'red' } }}
            rows={appGlobalState.superAdmin.clients.rows.get()}
            columns={getColumns()}
        />
        // <DataGridPro sx={{'& .header-class':{color:theme.palette.primary.main,  fontWeight:'bolder', fontSize: theme.spacing(1.8)}}}
        //     columns={getColumns()}
        //     density='compact'
        //     rows={appGlobalState.superAdmin.clients.rows.get()}
        //     showCellRightBorder={true}
        //     showColumnRightBorder={true}
        //     autoHeight= {true}
        // />
    )

    async function fetchData() {
        let i = 0
        const q = appGraphqlStrings['genericView']({ sqlKey: 'get-clients' })
        const ret = await queryGraphql(q)
        const data: any[] = getPayloadFromGraphqlObject(ret, 'genericView')
        const rows: any = data.map((row: any) => {
            // row.id1 = row.id
            // row.id = incr()
            return row
        })

        clients.set({ rows: [] })
        data && clients.rows.merge(rows)

        function incr() {
            return i++
        }
    }
    function getColumns() {
        return [
            {
                headerName: '#',
                width: 60,
                field: 'id',
            },
            {
                headerName: 'id',
                width: 60,
                field: 'id1',
            },
            {
                headerName: 'Name',
                width: 160,
                field: 'clientName',
                headerClassName: 'header-class',
                // editable:true,
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
