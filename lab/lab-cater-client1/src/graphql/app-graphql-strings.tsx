import { _, gql } from '../misc/redirect'

const appGraphqlStrings: any = {
    login: (credentials: any) => {
        const cred = encodeObj(credentials)
        return gql`
        query login {
            appServer {
                doLogin(credentials: "${cred}")
            }
        }
    `},

    genericView: () => gql`
        query mainModule {
            appServer {
                genericView
            }
        }
    `,
}

function encodeObj(obj: any) {
    let ret = ''
    if (!_.isEmpty(obj)) {
        ret = encodeURI(JSON.stringify(obj))
    }
    return (ret)
}
export { appGraphqlStrings, encodeObj }
