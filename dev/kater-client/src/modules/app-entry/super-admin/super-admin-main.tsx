import { createState } from '@hookstate/core'
import { Card, Paper } from '@mui/material'
import { appHookState, Box, Button, Container, Tab, TabContext, TabList, TabPanel, Tabs, Typography, useHookstate, useState } from '../../../misc/redirect'
import { SuperAdminMainClients } from './super-admin-main-clients'
import { CSSProperties } from '@mui/styled-engine'

function SuperAdminMain() {
    const appGlobalState = useHookstate(appHookState)
    const [value, setValue] = useState('1')

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue)
    };
    return (
        <Box sx={styles}>
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" textColor='secondary'>
                        <Tab className='tab' label="Clients" value="1" />
                        <Tab label="Users" value="2" />
                        <Tab label="Association" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ ml: 0, pl: 0 }}> <SuperAdminMainClients />
                </TabPanel>
                <TabPanel value="2">Users</TabPanel>
                <TabPanel value="3">Association</TabPanel>
            </TabContext>
        </Box>

    )
}
export { SuperAdminMain }

const styles = {
    width: '100%',
    '& .tab': { paddingLeft: 0 },
    // '& .grid-box': { height: 'calc(100vh - 230px)', }
}
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