import { JsonFormItemType } from "./interfaces"

function alphabetsOnly(item: JsonFormItemType, store: any) {
    const regExp = /[a-zA-Z]/
    const conditionName = 'alphabetsOnly'
    checkWithRegExp({
        item, store, regExp, conditionName
    })
}

function alphanumericAndSpace(item: JsonFormItemType, store: any) {
    const regExp = /[a-zA-Z0-9 ]/
    const conditionName = 'alphanumericAndSpace'
    checkWithRegExp({
        item, store, regExp, conditionName
    })
}

function alphanumericOnly(item: JsonFormItemType, store: any) {
    const regExp = /[a-zA-Z0-9]/
    const conditionName = 'alphanumericOnly'
    checkWithRegExp({
        item, store, regExp, conditionName
    })
}

function validPassword(item: JsonFormItemType, store: any) {
    const regExp = /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
    const conditionName = 'validPassword'
    checkWithRegExp({
        item, store, regExp, conditionName
    })
}

function numbersOnly(item: JsonFormItemType, store: any) {
    const regExp = /[0-9]/
    const conditionName = 'numbersOnly'
    checkWithRegExp({
        item, store, regExp, conditionName
    })
}

type CheckType = { item: JsonFormItemType; store: any; regExp: RegExp; conditionName: string }
function checkWithRegExp({ item, store, regExp, conditionName }: CheckType) {
    const val = store[item.name].data.value
    let arr = getStrippedArray(item, store, conditionName)
    arr.push(conditionName)
    if (regExp.test(val)) {
        arr.pop()
    }
    store[item.name].errors.value = arr
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

function getStrippedArray(item: JsonFormItemType, store: any, conditionName: string) {
    const arr = store[item.name].errors.value
    return arr.filter((x: string) => x !== conditionName)
}

const validationsMap: any = {
    alphabetsOnly: alphabetsOnly,
    alphanumericAndSpace: alphanumericAndSpace,
    alphanumericOnly: alphanumericOnly,
    numbersOnly: numbersOnly,
    required: required,
    validPassword: validPassword,
}

export { validationsMap }
