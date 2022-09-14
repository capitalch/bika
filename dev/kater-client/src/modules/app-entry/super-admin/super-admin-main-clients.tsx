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
        <Box sx={{ height: theme.spacing(50), width: '100%' }}>
            <DataGridPro
            rows={appGlobalState.superAdmin.clients.rows.get()}

            columns={[{
                headerName: 'id',
                width: 60,
                field: 'id'
            },
            {
                headerName: 'Name',
                width: 120,
                field: 'clientName'
            },
            {
                headerName: 'Short code',
                width: 100,
                field: 'shortCode'
            }
            ]}
        />
        </Box>

    )

    async function fetchData() {
        const q = appGraphqlStrings['genericView']({sqlKey:'get-clients'})
        const ret = await queryGraphql(q)
        const data = getPayloadFromGraphqlObject(ret, 'genericView')

        clients.set({ rows: [] })
        data && clients.rows.merge(data)
        console.log(ret)
    }
}
export { SuperAdminMainClients }