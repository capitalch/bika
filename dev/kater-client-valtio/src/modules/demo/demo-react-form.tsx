import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { JsonFormType } from '../../react-form/interfaces'
// import {  useDeepSignal } from './preact-deepsignal'
import { ReactForm, validateItems } from '../../react-form/react-form'
import { deepSignal, useDeepSignal } from './preact-deepsignal'
// import { demoObject } from './demo-store-signals'
import { sampleJsonForm } from './sample-json-form'

const store = deepSignal(getStoreObject(sampleJsonForm))

function DemoReactForm() {
    // const store = useDeepSignal(getStoreObject(sampleJsonForm))
    return (
        <Box>
            <ReactForm jsonForm={sampleJsonForm} store = {store} />
            <Button variant="contained" size="small" onClick={handleSubmit}>
                Submit
            </Button>
            <Button variant="contained" size="small" onClick={handleReset}>
                Reset
            </Button>
        </Box>
    )

    function handleSubmit() {
        // validateItems(sampleJsonForm, )
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

function getStoreObject(jsonForm: JsonFormType) {
    const obj: any = {}
    for (const item of jsonForm.items) {
        obj[item.name] = { data: '', errors: [] }
    }
    return obj
}

export { DemoReactForm }


// function getStoreObject() {
//     const obj: any = {}
//     for (const item of sampleJsonForm.items) {
//         obj[item.name] = { data: '', errors: [] }
//     }
//     return obj
// }
