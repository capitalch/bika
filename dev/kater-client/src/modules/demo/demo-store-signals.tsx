import { signal } from '@preact/signals-react'
import _ from 'lodash'

const demo = {
    personName: signal(''),
    address1: signal(''),
}

let demoStore: any = _.cloneDeep(demo)
// function resetDemoStore() {
//     demoStore = _.cloneDeep(demo)
//     demoStore.personName.value = ''
// }

export { demoStore }
