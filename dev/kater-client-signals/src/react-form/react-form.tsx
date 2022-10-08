import { Box } from '@mui/system'
import { useDeepSignal } from '../common/misc/preact-deepsignal'
import { formComponents } from './components/form-components'
import { JsonFormType, JsonFormItemType, ReactFormType } from './interfaces'
import { validationsMap } from './react-form-validations'

function ReactForm({jsonForm}: ReactFormType) {
    const store = useDeepSignal(getStoreObject(jsonForm))
    return (
        <Box sx={jsonForm.sx || undefined}>
            {jsonForm.items.map((item: any, index: number) => {
                const Tag = formComponents[item.type]
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

function validateItem(item: JsonFormItemType, store: any) {
    if (item.validations) {
        for (const validation of item.validations) {
            validationsMap[validation](item, store)
        }
    }
}

export { ReactForm, validateItem }
