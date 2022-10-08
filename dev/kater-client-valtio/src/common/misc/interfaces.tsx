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
    xData: SqlObjectData
    deletedIds?: string[]
    fkeyName?: string
    generateId?: boolean
    idGeneratorTableName?: string
    idInsert?: boolean
    tableName: string
}

interface SqlObjectData {
    xDetails?: SqlObject[]
    [key:string]: any
}

export {type ErrorMessage, type MaterialDialog,  type SqlObject }