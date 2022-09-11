import { mainMenu } from '../components/app-client/app-client-main-menu'
import { hookstate } from '../misc/redirect'

const appHookState = hookstate({
    loginInfo: {
        isLoggedIn: false,
        token: '',
        userType: '',
        uid: '',
    },
    currentComponentName: 'cateringHome',
    dialog: {
        showDialog: false,
        title: ''
    },
    errorMessage: {
        show: false,
        message: ''
    },
    isLoading: false,
    open: false, // drawer open or close
    selectedMenu: mainMenu,
    successMessage: {
        show: false,
        message: 'Operation successful'
    },
    wizard1: {
        currentPage: 1,
        pageCount: 4
    }
})
export { appHookState }

// const entireHookState = hookstate({

// })
// export { entireHookState }