import { Box, Tab, TabContext, TabList, TabPanel, useState } from '../../../common/misc/redirect'
import { SuperAdminClients } from './super-admin-clients'

function SuperAdminMain() {
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
                <TabPanel value="1" sx={{ ml: 0, pl: 0 }}> <SuperAdminClients />
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