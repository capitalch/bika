import { signal } from '@preact/signals-react'
import { deepSignal } from 'preact-signal-store'
import _ from 'lodash'

const demo = {
    personName: signal(''),
    address1: signal(''),
    address2: signal('')
}
const demo1 = {
    personName: '',
    address1: '',
    address2: '',
    errors: {
        personName: '',
        address1: '',
        address2: ''
    }
}
let demoClone: any = _.cloneDeep(demo1)
// let demoStore = demoClone // deepSignal(demoClone)
let demoStore:any = deepSignal(demoClone)
// function resetDemoStore() {
//     demoStore = _.cloneDeep(demo)
//     demoStore.personName.value = ''
// }

export { demoStore }
