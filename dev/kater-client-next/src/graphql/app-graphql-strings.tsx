import { gql } from '../common/misc/redirect'
import _ from 'lodash'
const appGraphqlStrings: any = {
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
