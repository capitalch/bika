import { Box } from '@mui/system'
import { useEffect } from 'react'
import { formComponents } from './form-components'
import { JsonFormItemType, ReactFormType } from './interfaces'
import { validationsMap } from './react-form-validations'

function ReactForm({ jsonForm, store }: ReactFormType) {
    useEffect(() => {
        // for (const er in store.errors) {
        //     store.errors[er] = {}
        // }
    }, [])
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

function validateItem(item: JsonFormItemType, store: any) {
    if (item.validations) {
        for (const validation of item.validations) {
            validationsMap[validation](item, store)
        }
    }
}

export { ReactForm, validateItem }
