import { JsonFormItemType } from "./interfaces"

function required(item: JsonFormItemType, store: any) {
    const ret = store[item.name].data.value ? '' : 'required'
    const arr = store[item.name].errors.value
    // store[item.name].errors.value = arr.filter((x:string)=>x !== 'required')
    // if(ret){
        // arr.push('required')
        store[item.name].errors.value = ret
    // }
}

const validationsMap: any = {
    required: required,
}

export { validationsMap }
