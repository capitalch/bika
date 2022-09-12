import { sideBarMainMenu } from '../components/app-client/side-bar/app-client-side-bar-menus'
// import { hookstate } from '../misc/redirect'
import _ from 'lodash'
import {createHookstate,createState, hookstate } from '@hookstate/core'

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

    superAdmin: {},
}

let clone = _.cloneDeep(appHook)

let appHookState = createState(clone)

function resetAppHoookState(){
    // appHookState.merge(appHook)
    // appHookState.destroy()
    console.log(JSON.parse(JSON.stringify(appHookState.get())))
    // appHookState.merge(appHook)
    // clone = _.cloneDeep(appHook)
    // appHookState = hookstate(clone)
    console.log(JSON.parse(JSON.stringify(appHookState.get())))
}

export {appHook, appHookState, resetAppHoookState }
