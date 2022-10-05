import { JsonFormItemType } from "./interfaces"

function required(item: JsonFormItemType, store: any) {
    const ret = store[item.name].data.value ? '' : 'required'
    let arr = store[item.name].errors.value
    arr = arr.filter((x:string)=>x !== 'required')
    if(ret){
        arr.push('required')        
    }
    store[item.name].errors.value = arr
}

const validationsMap: any = {
    required: required,
}

export { validationsMap }
