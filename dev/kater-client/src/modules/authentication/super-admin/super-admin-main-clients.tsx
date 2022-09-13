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
        <Box sx={{ height: theme.spacing(50) }}><DataGridPro
            rows={appGlobalState.superAdmin.clients.rows.get()}

            columns={[{
                headerName: 'id',
                width: 60,
                field: 'id'
            },
            {
                headerName: 'First',
                width: 60,
                field: 'firstName'
            },
            {
                headerName: 'Age',
                width: 60,
                field: 'age'
            }
            ]}
        /></Box>

    )

    async function fetchData() {
        const q = appGraphqlStrings['genericView']({sqlKey:'get-clients'})
        const ret = await queryGraphql(q)
        const data = getPayloadFromGraphqlObject(ret, 'genericView')

        clients.set({ rows: [] })
        clients.rows.merge(data)
        console.log(ret)
    }
}
export { SuperAdminMainClients }