import { AppXXGrid } from '../../../components/app-common/app-xx-grid'
import { appGraphqlStrings, appHookState, Box, Button, Container, DataGridPro, getPayloadFromGraphqlObject, Tab, TabContext, TabList, TabPanel, Tabs, Typography, useAppGraphql, useEffect, useHookstate, useState, useTheme } from '../../../misc/redirect'

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
        // <AppXXGrid
        //     sx={{'& .custom-header':{color:'red'}}}
        //     rows={appGlobalState.superAdmin.clients.rows.get()}
        //     getColumns={getColumns}
        // />
        <DataGridPro sx={{'& .header-class':{color:theme.palette.primary.main,  fontWeight:'bolder', fontSize: theme.spacing(1.8)}}}
            columns={getColumns()}
            density='compact'
            rows={appGlobalState.superAdmin.clients.rows.get()}
            showCellRightBorder={true}
            showColumnRightBorder={true}
            autoHeight= {true}
        />

    )

    async function fetchData() {
        const q = appGraphqlStrings['genericView']({ sqlKey: 'get-clients' })
        const ret = await queryGraphql(q)
        const data = getPayloadFromGraphqlObject(ret, 'genericView')

        clients.set({ rows: [] })
        data && clients.rows.merge(data)
        console.log(ret)
    }
    function getColumns() {
        return [{
            headerName: 'id',
            width: 60,
            field: 'id'
        },
        {
            headerName: 'Name',
            width: 160,
            field: 'clientName',
            headerClassName:'header-class'
            // editable:true,
        },
        {
            headerName: 'Short code',
            width: 120,
            field: 'shortCode'
        },
        {
            headerName: 'Remarks',
            width: 140,
            field: 'remarks'
        },
        {
            headerName: 'Database name',
            width: 120,
            field: 'dbName'
        },
        {
            headerName: 'Active',
            width: 80,
            type: 'boolean',
            field: 'isActive'
        },
        {
            headerName: 'Time created',
            flex: 1,
            field: 'timestamp'
        },
        ]
    }
}
export { SuperAdminMainClients }