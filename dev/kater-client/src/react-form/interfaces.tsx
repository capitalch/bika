interface ReactFormType {
    jsonForm: FormType
}

interface FormType{
    items:any[]
}

interface FormComponentType{
    [key:string]: React.FC
}
export { type FormComponentType, type ReactFormType }