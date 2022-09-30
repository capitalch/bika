interface ReactFormType {
    jsonForm: any
    store: any
}

interface FormComponentType{
    [key:string]: React.FC<any>
}
export { type FormComponentType, type ReactFormType }