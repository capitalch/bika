import { gql } from '@apollo/client'

const appGraphqlStrings: any = {
    login: (credentials: string) => gql`
        query login {
            appServer {
                doLogin(credentials: "${credentials}")
            }
        }
    `,
    genericView: () => gql`
        query mainModule {
            appServer {
                genericView
            }
        }
    `,
}
export { appGraphqlStrings }
