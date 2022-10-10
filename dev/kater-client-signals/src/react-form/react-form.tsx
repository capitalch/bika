import { Box } from '@mui/system'
import { useEffect, useRef } from 'react'
import _ from 'lodash'
import { deepSignal, useDeepSignal } from './preact-deepsignal'
import { formComponents } from './components/form-components'
import { JsonFormType, JsonFormItemType, ReactFormType } from './interfaces'
import { validationsMap } from './react-form-validations'
import { Button, Typography } from '@mui/material'
import { errorMessages } from './error-messages'
import { If, Then } from 'react-if'
import { ItemErrors } from './components/item-errors'

function ReactForm({ jsonForm, store }: ReactFormType) {
    const meta: any = useRef({
        store: undefined,
    })

    if (store) {
        meta.current.store = store
    } else if (_.isEmpty(meta.current.store)) {
        meta.current.store = deepSignal(getStoreObject(jsonForm))
    }
    if (!jsonForm.submit.isFullWidthSubmitButton) {
        jsonForm.submit.isFullWidthSubmitButton = true
    }

    useEffect(() => {
        setDefaultValues(jsonForm, meta.current.store)
    }, [])

    return (
        <Box sx={jsonForm.sx || undefined}>
            {jsonForm.items.map((item: any, index: number) => {
                const Tag = formComponents[item.typeName]
                const Comp = (
                    <Tag key={index} item={item} store={meta.current.store} />
                )
                return Comp
            })}

            {/* Submit button */}
            <Typography component="div" sx={{ mt: 2 }}>
                <Button
                    fullWidth={jsonForm.submit.isFullWidthSubmitButton}
                    variant="contained"
                    onClick={handleOnSubmit}>
                    Submit
                </Button>
            </Typography>

            {/* Server error */}
            <If condition={meta.current.store.serverError.value}>
                <Then>
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{ mt: 2 }}>
                        {errorMessages.serverError}
                    </Typography>
                </Then>
            </If>
        </Box>
    )

    function handleOnSubmit() {
        validateItems(jsonForm, meta.current.store)
        if (!hasFormError(meta.current.store)) {
            jsonForm.submit.onSubmit(meta.current.store)
        }
    }
}

function hasFormError(store: any): boolean {
    let ret: boolean = false
    for (const item in store) {
        if (item === 'serverError') {
            continue
        }
        if (store[item].errors.value.length > 0) {
            ret = true
            break
        }
    }
    return ret
}

function getStoreObject(jsonForm: any) {
    const obj: any = {}
    for (const item of jsonForm.items) {
        obj[item.name] = { data: '', errors: [] }
    }
    obj.serverError = ''
    return obj
}

function setDefaultValues(jsonForm: JsonFormType, store: any) {
    for (const item of jsonForm.items) {
        if (item.defaultValue) {
            store[item.name].data.value =
                store[item.name].data.value || item.defaultValue
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

export { hasFormError, ReactForm, validateItem, validateItems }
