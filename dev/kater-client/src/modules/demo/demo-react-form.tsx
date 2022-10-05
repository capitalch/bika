import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import {  useDeepSignal } from './preact-deepsignal'
import { ReactForm } from '../../react-form/react-form'
import { demoObject } from './demo-store-signals'
import { sampleJsonForm } from './sample-json-form'

function DemoReactForm() {
    // const demoStore: any = useDeepSignal(getStoreObject())
    return (
        <Box>
            <ReactForm jsonForm={sampleJsonForm} />
            <Button variant="contained" size="small" onClick={handleSubmit}>
                Submit
            </Button>
            <Button variant="contained" size="small" onClick={handleReset}>
                Reset
            </Button>
        </Box>
    )

    function handleSubmit() {
        // const data = JSON.parse(JSON.stringify(demoStore.value))
        // console.log(data)
        // console.log(demoStore)
    }

    function handleReset() {
        for (const item of sampleJsonForm.items) {
            // demoStore[item.name].value = ''
        }
    }
}

function getStoreObject() {
    const obj: any = {}
    for (const item of sampleJsonForm.items) {
        obj[item.name] = { data: '', errors: [] }
    }
    return obj
}
export { DemoReactForm }

{
    /* <TextField
                sx={{ mt: 2 }}
                size='small'
                value={localStore.firstName.value}
                label='abcd'
                onChange={(e: any) => {
                    localStore.firstName.value = e.target.value
                }}
            /> */
}
