import { SxProps } from "@mui/material"
import { ValidationTypes } from "./react-form-validations"

interface ReactFormType {
    jsonForm: JsonFormType
    store?: any
}

interface JsonFormComponentParmType {
    item: JsonFormItemType
    store: any
}

interface JsonFormType {
    items: JsonFormItemType[]
    sx?: SxProps
}

interface JsonFormItemType {
    defaultValue?: any
    label?: string
    onChange?: (e: any) => void
    options?: selectOption[]
    name: string
    sx?: SxProps
    typeName: ItemTypeNameType
    validations?: ValidationTypes
}

type selectOption = { label: string; value: string }

type ItemTypeNameType = 'SelectCommon' | 'SelectMaterial' | 'TextMaterial'

    interface FormComponentType {
    [key: string]: React.FC<any>
}


export { type FormComponentType, type JsonFormComponentParmType, type JsonFormItemType, type JsonFormType, type ReactFormType }