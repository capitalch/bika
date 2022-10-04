// import { signal } from '@preact/signals-react'
import { deepSignal } from 'preact-signal-store'
import _ from 'lodash'

const demoObject:any= {
    personName:'',
    address1:'',
    address2:'',
    errors: {
        personName: { required: '' },
        address1: { required: '' },
        address2: { required: '' },   
    }
}
function adjust(obj: any) {
    obj.personName = ''
    obj.address1 = ''
    obj.address2 = ''
    obj.errors = {
        personName: { required: '' },
        address1: { required: '' },
        address2: { required: '' },
    }
}
// adjust(demoObject)
let demoClone: any = _.cloneDeep(demoObject)
let demoStore:any = deepSignal(demoObject)
const x = 1
export { adjust, demoObject, demoStore}
// let demoClone: any = _.cloneDeep(demo1)
// let demoStore = demoClone // deepSignal(demoClone)
// let demoStore: any = deepSignal(demoClone)
// function resetDemoStore() {
//     demoStore = _.cloneDeep(demo)
//     demoStore.personName.value = ''
// }
