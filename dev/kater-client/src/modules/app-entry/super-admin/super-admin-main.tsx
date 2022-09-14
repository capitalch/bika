import { createState } from '@hookstate/core';
import { Card, Paper } from '@mui/material';
import { appHookState, Box, Button, Container, Tab, TabContext, TabList, TabPanel, Tabs, Typography, useHookstate, useState } from '../../../misc/redirect'
import { SuperAdminMainClients } from './super-admin-main-clients';
function SuperAdminMain() {
    const appGlobalState = useHookstate(appHookState)
    const [value, setValue] = useState('1');

    const handleChange = (event:any, newValue:any) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" textColor='secondary'>
                        <Tab label="Clients" value="1" />
                        <Tab label="Users" value="2" />
                        <Tab label="Associate" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1"> <SuperAdminMainClients />
                </TabPanel>
                <TabPanel value="2">Users</TabPanel>
                <TabPanel value="3">Associate</TabPanel>
            </TabContext>
        </Box>

    )
}
export { SuperAdminMain }

// const tenantState = createState({})

/* 

        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value="one" label="Item One" />
                <Tab value="two" label="Item Two" />
                <Tab value="three" label="Item Three" />
            </Tabs>
        </Box> */