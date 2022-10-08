import { ErrorMessage, globalStore, produce } from './redirect'
const Cryptojs = require('crypto-js')

function changeState(state: any, setState: any, changeObj: any) {
    const newState: any = produce(state, (draft: any) => {
        for (const prop in changeObj) {
            draft[prop] = changeObj[prop]
        }
    })
    setState(newState)
}

function closeDialog() {
    globalStore.dialog.showDialog = false
}

function cryptoEncrypt(text: string) {
    const privateKey: any = process.env.REACT_APP_LOGIN_TIME_KEY || ''
    const key = Cryptojs.enc.Utf8.parse(privateKey)
    const encrypted = Cryptojs.AES.encrypt(text, key, {
        mode: Cryptojs.mode.ECB,
    }).toString()
    return encrypted
}

function getPayloadFromGraphqlObject(obj: any, payloadName: string) {
    return obj?.data?.appServer?.[payloadName]
}

function getRowsWithSwappedId(rows: any[]) {
    let cnt = 0
    function inc() {
        return ++cnt
    }
    const out: any[] = produce(rows, (draft: any) => {
        for (const row of draft) {
            row['id1'] = row['id']
            row['id'] = inc()
        }
        return draft
    })
    return out
}

function loadComponent(component: () => any) {
    globalStore.misc.currentComponent = component
}

function showDialog({
    title,
    isClosable = true,
    content,
}: {
    title: string
    isClosable?: boolean
    content: () => any
}) {
    globalStore.dialog.title = title
    globalStore.dialog.isClosable = isClosable
    globalStore.dialog.content = content
    globalStore.dialog.showDialog = true
}

function showErrorMessage(errorMessage: ErrorMessage) {
    globalStore.errorMessage.message = errorMessage.message
    globalStore.errorMessage.show = true
}

function showSuccessMessage(){
    globalStore.successMessage.show=true
}

export {
    changeState,
    closeDialog,
    cryptoEncrypt,
    getPayloadFromGraphqlObject,
    getRowsWithSwappedId,
    loadComponent,
    showDialog,
    showErrorMessage,
    showSuccessMessage
}
