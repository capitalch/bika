import { createState } from '@hookstate/core';
import { appHookState, Box, Button, Container, Tab, TabContext, TabList, TabPanel, Tabs, Typography, useHookstate, useState } from '../../../misc/redirect'
function SuperAdminTenant() {
    const appGlobalState = useHookstate(appHookState)
    const tenantGlobalState = useHookstate(tenantState)

    const [value, setValue] = useState('1');

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    const val:any = appGlobalState.superAdmin.get()
    return (<Container>
        <Typography>{val.a}</Typography>
        <Button variant='contained' size='small' onClick={() => {
            appGlobalState.superAdmin.merge({
                a: 'xxx'
            })
            // appGlobalState.superAdmin.x = 'abc'
        }}>Test</Button>

        <Button onClick={() => {
            appGlobalState.superAdmin.merge({ a: 'bbb' })
        }}>Test1</Button>
    </Container>)
}
export { SuperAdminTenant }

const tenantState = createState({})

/* <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" textColor='secondary'>
                        <Tab label="All tenants" value="1" />
                        <Tab label="New" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
        </Box> 

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