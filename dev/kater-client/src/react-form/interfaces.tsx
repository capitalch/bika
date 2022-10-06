import { SxProps } from "@mui/material"
import { EnumValidators } from "./react-form-validations"

interface ReactFormType {
    jsonForm: JsonFormType
}

interface JsonFormType {
    items: JsonFormItemType[]
    sx?: SxProps
}

interface JsonFormItemType {
    label: string
    name: string
    sx?: SxProps
    type: string
    validations?: string[]
}

interface FormComponentType {
    [key: string]: React.FC<any>
}

interface StoreItemType {
    [key: string]: any
}

export { type FormComponentType, type JsonFormItemType, type ReactFormType, }