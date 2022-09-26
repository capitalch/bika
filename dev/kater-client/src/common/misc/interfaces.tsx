interface ErrorMessage{
    message: string
}
interface MaterialDialog{
    Content: any
    isClosable: boolean
    showDialog: boolean
    title: string    
}
interface SqlObject {
    data: SqlObjectData
    deletedIds?: string[]
    fkeyName?: string
    generateId?: boolean
    idGeneratorTableName?: string
    idInsert?: boolean
    tableName: string
}

interface SqlObjectData {
    details?: SqlObject[]
    [key:string]: any
}

export {type ErrorMessage, type MaterialDialog,  type SqlObject }