import { JsonFormItemType } from "./interfaces"

function required(item: JsonFormItemType, store: any) {
    const ret = store[item.name].value ? '' : 'Item is required'
    // store.errors[item.name].value = ret
    store.errors[item.name]['required'].value = ret
}

const validationsMap: any = {
    required: required,
}

export { validationsMap }
