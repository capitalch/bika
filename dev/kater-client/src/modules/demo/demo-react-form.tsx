import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { ReactForm } from '../../react-form/react-form'
import { demoStore } from './demo-store-signals'
import { sampleJsonForm } from './sample-json-form'

function DemoReactForm() {
    return (
        <Box>
            <ReactForm jsonForm={sampleJsonForm} store = {demoStore} />
            <Button variant='contained' size='small' onClick={handleSubmit}>Submit</Button>
            <Button variant='contained' size='small' onClick={handleReset}>Reset</Button>
            <Button variant='contained' size='small' onClick={handleGenerateError}>Generate error</Button>
        </Box>
    )

    function handleSubmit(){
        const data = demoStore
        console.log(demoStore)
    }

    function handleReset(){
        // resetDemoStore()
        for(const item of sampleJsonForm.items){
            demoStore[item.name].value= ''
        }
        // demoStore['address1']['value'] = ''
    }

    function handleGenerateError(){
        demoStore.errors.address1.value = 'abcd'
    }
}
export { DemoReactForm }
