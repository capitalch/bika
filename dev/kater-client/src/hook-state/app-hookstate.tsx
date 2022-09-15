import {createState, hookstate } from '@hookstate/core'
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
        clients:{
            rows:[]
        }
    },
}
let clone = _.cloneDeep(appHook)

// const appHookState = hookstate(clone)
const appHookState = createState(clone)

export { appHook, appHookState }
