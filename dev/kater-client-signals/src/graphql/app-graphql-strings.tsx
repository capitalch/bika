import { gql } from '../common/misc/redirect'
import _ from 'lodash'
const appGraphqlStrings: any = {
    genericUpdate: (val: any, moduleName: string = 'appEntry') => {
        const value = encodeObj(val)
        return gql`
        mutation ${moduleName} {
            appServer {
                genericUpdate(value:"${value}")
            }
        }
        `
    },

    genericUpdate1: (val: any, moduleName: string = 'appEntry') => {
        const value = encodeObj(val)
        return gql`
        query ${moduleName} {
            appServer {
                genericUpdate(value:"${value}")
            }
        }
        `
    },

    genericView: (val: GenericViewValues, moduleName: string = 'appEntry') => {
        const value = encodeObj(val)
        return gql`
        query ${moduleName} {
            appServer {
                genericView(value:"${value}")
            }
        }
    `
    },

    login: (credentials: any) => {
        const cred = encodeObj(credentials)
        return gql`
        query login {
            appServer {
                doLogin(credentials: "${cred}")
            }
        }
    `
    },

    testComments: () => gql`
        subscription onTestComments(){
            commentAdded(){
                id
                content
            }
        }
    `
}

function encodeObj(obj: any) {
    let ret = ''
    if (!_.isEmpty(obj)) {
        ret = encodeURI(JSON.stringify(obj))
    }
    return ret
}
export { appGraphqlStrings, encodeObj }

interface GenericViewValues {
    sqlKey: string
    isMultipleRows: boolean
    args: any
}
