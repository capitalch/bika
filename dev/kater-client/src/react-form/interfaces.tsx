import { SxProps } from "@mui/material"

interface ReactFormType {
    jsonForm: JsonFormType
    store: StoreItemType
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

// interface JsonFormValidationType{
//     [key:string]: string
// }

interface FormComponentType {
    [key: string]: React.FC<any>
}

interface StoreItemType {
    [key: string]: any
}
export { type FormComponentType, type JsonFormItemType, type ReactFormType }