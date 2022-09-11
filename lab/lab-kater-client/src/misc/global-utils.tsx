import { } from './redirect'
const Cryptojs = require('crypto-js')

function cryptoEncrypt(text: string) {
    const privateKey: any = process.env.REACT_APP_LOGIN_TIME_KEY || ''
    const key = Cryptojs.enc.Utf8.parse(privateKey)
    const encrypted = Cryptojs.AES.encrypt(text, key, {
        mode: Cryptojs.mode.ECB,
    }).toString()
    return (encrypted)
}

function getPayloadFromGraphqlObject(obj: any, payloadName: string) {
    return (obj?.data?.appServer?.[payloadName])
}

export { cryptoEncrypt, getPayloadFromGraphqlObject }
