import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { ReactForm } from '../../react-form/react-form'
import { sampleJsonForm } from './sample-json-form'

function DemoReactForm() {
    return (
        <Box>
            <ReactForm jsonForm={sampleJsonForm}  />
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

export { DemoReactForm }


// function getStoreObject() {
//     const obj: any = {}
//     for (const item of sampleJsonForm.items) {
//         obj[item.name] = { data: '', errors: [] }
//     }
//     return obj
// }
