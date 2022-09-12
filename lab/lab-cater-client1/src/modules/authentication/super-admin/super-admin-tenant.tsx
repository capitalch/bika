import { createState } from '@hookstate/core';
import { appHookState, Box, Button, Container, DataGridPro, Tab, TabContext, TabList, TabPanel, Tabs, Typography, useHookstate, useState } from '../../../misc/redirect'
function SuperAdminTenant() {
    const appGlobalState = useHookstate(appHookState)
    const tenantGlobalState = useHookstate(tenantState)

    return (<Container>
        {/* <DataGridPro 
        
        /> */}
    </Container>)
}
export { SuperAdminTenant }

const tenantState = createState({})