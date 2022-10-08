import { Box } from '@mui/system'
import { useEffect } from 'react'
import _ from 'lodash'
import { deepSignal, useDeepSignal } from '../modules/demo/preact-deepsignal'
import { formComponents } from './components/form-components'
import { JsonFormType, JsonFormItemType, ReactFormType } from './interfaces'
import { validationsMap } from './react-form-validations'

function ReactForm({ jsonForm, store }: ReactFormType) {

    if (_.isEmpty(store)) {
        store = deepSignal(getStoreObject(jsonForm))
    }
    // setDefaultValues(jsonForm, store)
    // const store = useDeepSignal(getStoreObject(jsonForm))
    useEffect(() => {
        setDefaultValues(jsonForm, store)
    }, [])
    return (
        <Box sx={jsonForm.sx || undefined}>
            {jsonForm.items.map((item: any, index: number) => {
                const Tag = formComponents[item.typeName]
                const Comp = <Tag key={index} item={item} store={store} />
                return Comp
            })}
        </Box>
    )
}

function getStoreObject(jsonForm: any) {
    const obj: any = {}
    for (const item of jsonForm.items) {
        obj[item.name] = { data: '', errors: [] }
    }
    return obj
}

function setDefaultValues(jsonForm: JsonFormType, store: any) {
    for (const item of jsonForm.items) {
        if (item.defaultValue) {
            store[item.name].data.value = store[item.name].data.value || item.defaultValue
        }
    }
}

function validateItem(item: JsonFormItemType, store: any): void {
    if (item.validations) {
        for (const validation of item.validations) {
            validationsMap[validation](item, store)
        }
    }
}

function validateItems(jsonForm: JsonFormType, store: any): void {
    for (const item of jsonForm.items) {
        validateItem(item, store)
    }
}

export { ReactForm, validateItem, validateItems }
