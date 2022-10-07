import { JsonFormItemType } from './interfaces'

function alphabetsOnly(item: JsonFormItemType, store: any) {
    const invRegExp = /[^a-zA-Z]/
    const conditionName = 'alphabetsOnly'
    checkWithInvRegExp({
        item,
        store,
        invRegExp,
        conditionName,
    })
}

function alphanumericAndSpace(item: JsonFormItemType, store: any) {
    const invRegExp = /[^a-zA-Z0-9 ]/
    const conditionName = 'alphanumericAndSpace'
    checkWithInvRegExp({
        item,
        store,
        invRegExp,
        conditionName,
    })
}

function alphanumericOnly(item: JsonFormItemType, store: any) {
    const invRegExp = /[^a-zA-Z0-9]/
    const conditionName = 'alphanumericOnly'
    checkWithInvRegExp({
        item,
        store,
        invRegExp,
        conditionName,
    })
}

function atLeast8Chars(item: JsonFormItemType, store: any) {
    const conditionName = 'atLeast8Chars'
    let arr = getStrippedArray(item, store, conditionName)
    const val = store[item.name].data.value
    arr.push(conditionName)
    if (val && val.length >= 8) {
        arr.pop()
    }
    store[item.name].errors.value = arr
}

function email(item: JsonFormItemType, store: any){
    const regExp = /^.+@[^\.].*\.[a-z]{2,}$/
    const conditionName = 'email'
    checkWithRegExp({
        item,
        store,
        regExp,
        conditionName,
    })
}

function numbersOnly(item: JsonFormItemType, store: any) {
    const invRegExp = /[^0-9]/
    const conditionName = 'numbersOnly'
    checkWithInvRegExp({
        item,
        store,
        invRegExp,
        conditionName,
    })
}

function oneNumeric(item: JsonFormItemType, store: any){
    const regExp = /[0-9]/
    const conditionName = 'oneNumeric'
    checkWithRegExp({
        item,
        store,
        regExp,
        conditionName,
    })
}

function oneSpecialChar(item: JsonFormItemType, store: any) {
    const regExp = /[^0-9a-zA-Z]/
    const conditionName = 'oneSpecialChar'
    checkWithRegExp({
        item,
        store,
        regExp,
        conditionName,
    })
}

function oneUpperCase(item: JsonFormItemType, store: any) {
    const regExp = /[A-Z]/
    const conditionName = 'oneUpperCase'
    checkWithRegExp({
        item,
        store,
        regExp,
        conditionName,
    })
}

function required(item: JsonFormItemType, store: any) {
    const conditionName = 'required'
    const ret = store[item.name].data.value ? '' : conditionName
    let arr = getStrippedArray(item, store, conditionName)
    if (ret) {
        arr.push(conditionName)
    }
    store[item.name].errors.value = arr
}

function validPassword(item: JsonFormItemType, store: any) {
    const invRegExp = /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
    const conditionName = 'validPassword'
    checkWithInvRegExp({
        item,
        store,
        invRegExp,
        conditionName,
    })
}

type InvCheckType = {
    item: JsonFormItemType
    store: any
    invRegExp: RegExp
    conditionName: string
}
function checkWithInvRegExp({ item, store, invRegExp, conditionName }: InvCheckType) {
    const val = store[item.name].data.value
    let arr = getStrippedArray(item, store, conditionName)
    if (invRegExp.test(val)) {
        arr.push(conditionName)
    }
    store[item.name].errors.value = arr
}
type CheckType = {
    item: JsonFormItemType
    store: any
    regExp: RegExp
    conditionName: string
}
function checkWithRegExp({ item, store, regExp, conditionName }: CheckType){
    const val = store[item.name].data.value
    let arr = getStrippedArray(item, store, conditionName)
    arr.push(conditionName)
    if(regExp.test(val)){
        arr.pop()
    }
    store[item.name].errors.value = arr
}

function getStrippedArray(
    item: JsonFormItemType,
    store: any,
    conditionName: string
) {
    const arr = store[item.name].errors.value
    return arr.filter((x: string) => x !== conditionName)
}

const validationsMap: any = {
    alphabetsOnly: alphabetsOnly,
    alphanumericAndSpace: alphanumericAndSpace,
    alphanumericOnly: alphanumericOnly,
    atLeast8Chars: atLeast8Chars,
    email: email,
    numbersOnly: numbersOnly,
    oneNumeric:oneNumeric,
    oneSpecialChar: oneSpecialChar,
    oneUpperCase: oneUpperCase,
    required: required,
    validPassword: validPassword,
}

type ValidationTypes = Array<
    | 'alphabetsOnly'
    | 'alphanumericAndSpace'
    | 'alphanumericOnly'
    | 'atLeast8Chars'
    | 'email'
    | 'numbersOnly'
    | 'oneNumeric'
    | 'oneSpecialChar'
    | 'oneUpperCase'
    | 'required'
>

export { validationsMap, type ValidationTypes }
