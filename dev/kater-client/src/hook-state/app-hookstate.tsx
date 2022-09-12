import { mainMenu } from '../components/app-client/app-client-main-menu'
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
        currentComponentName: 'cateringHome',
        open: false, // drawer open or close
        selectedMenu: mainMenu,
        showLoadingDialog: false,
    },

    successMessage: {
        show: false,
        message: 'Operation successful',
    },
})

export { appHookState }
