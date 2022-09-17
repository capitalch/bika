import { createState, hookstate } from '@hookstate/core'
import { sideBarMainMenu } from '../components/app-navigation/side-bar/app-navigation-side-bar-menus'
// import {createState, hookstate } from '../misc/redirect'
import _ from 'lodash'

const appHook = {
    dialog: {
        showDialog: false,
        title: '',
    },

    errorMessage: {
        show: false,
        message: '',
    },

    loginInfo: {
        isLoggedIn: false,
        token: '',
        userType: '',
        uid: '',
    },

    misc: {
        branchId: 1,
        currentComponentName: '',
        dbSchemaName: 'demo',
        headerMainMenuName: '',
        open: false, // drawer open or close
        sideBarMenu: sideBarMainMenu,
        showLoadingDialog: false,
    },

    successMessage: {
        show: false,
        message: 'Operation successful',
    },

    superAdmin: {
        clients: {
            xxGridHookstate: {
                rows: [],
                rowsViewLimit: '100',
                searchString: '',
                // fetchData:()=>{}
            },
        },
    },
}
let appClone = _.cloneDeep(appHook)
const appHookState = createState(appClone)

export { appHook, appHookState }

// const xxGridHook = {
//     superAdmin: {
//         clients: {
//             rows: [],
//             rowsViewLimit: '100',
//             searchString: '',
//         },
//     },
// }
// const xxGridClone = _.cloneDeep(xxGridHook)
// const xxGridHookState = createState(xxGridClone)
// export { xxGridHook, xxGridHookState }
