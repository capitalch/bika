import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { deepSignal, useDeepSignal } from './preact-deepsignal'
import { ReactForm } from '../../react-form/react-form'
import { demoObject } from './demo-store-signals'
import { sampleJsonForm } from './sample-json-form'

const demoStore = deepSignal(demoObject)
function DemoReactForm() {
    // const demoStore: any = useDeepSignal(demoObject)
    return (
        <Box>
            <ReactForm jsonForm={sampleJsonForm} store={demoStore} />
            <Button variant='contained' size='small' onClick={handleSubmit}>Submit</Button>
            <Button variant='contained' size='small' onClick={handleReset}>Reset</Button>
            <Button variant='contained' size='small' onClick={handleGenerateError}>Generate error</Button>
            {/* <TextField
                sx={{ mt: 2 }}
                size='small'
                value={localStore.firstName.value}
                label='abcd'
                onChange={(e: any) => {
                    localStore.firstName.value = e.target.value
                }}
            /> */}
        </Box>
    )

    function handleSubmit() {
        const data = JSON.parse(JSON.stringify(demoStore.value))
        console.log(data)
        // console.log(demoStore)
    }

    function handleReset() {
        // resetDemoStore()
        for (const item of sampleJsonForm.items) {
            demoStore[item.name].value = ''
        }
        // demoStore['address1']['value'] = ''
    }

    function handleGenerateError() {
        // demoStore.errors.address1.value = 'abcd'
    }
}

function getStoreObject() {
    const obj: any = {}
    for (const item of sampleJsonForm.items) {
        obj[item.name] = { data: '', errors: [] }
    }
    return(obj)
}
export { DemoReactForm }
