import { globalStore, immer } from './redirect'
const Cryptojs = require('crypto-js')

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
    const out: any[] = immer(rows, (draft: any) => {
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

// function showForm({title,content}:{title:string;content:()=>any}){
// showDialog
// }

export {
    cryptoEncrypt,
    getPayloadFromGraphqlObject,
    getRowsWithSwappedId,
    loadComponent,
    showDialog,
}
