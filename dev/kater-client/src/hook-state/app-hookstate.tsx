import { sideBarMainMenu } from '../components/app-client/app-client-side-bar-menus'
// import { hookstate } from '../misc/redirect'
import { hookstate } from '@hookstate/core'

const appHookState = hookstate({
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
        currentComponentName: 'cateringHome',
        dbSchemaName: 'demo',
        open: false, // drawer open or close
        selectedMenu: sideBarMainMenu,
        showLoadingDialog: false,
    },

    successMessage: {
        show: false,
        message: 'Operation successful',
    },
})

export { appHookState }
