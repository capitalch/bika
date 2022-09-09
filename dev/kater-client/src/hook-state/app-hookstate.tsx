import { mainMenu } from '../components/app-client/app-client-main-menu'
import { hookstate } from '../misc/redirect'

const appHookState = hookstate({
    appUser: {
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
    errorMessage:{
        show: false,
        message:''
    },
    isLoading: false,
    open: false, // drawer open or close
    selectedMenu: mainMenu,
    successMessage:{
        show: false,
        message: 'Operation successful'
    },
})
export { appHookState }

// const entireHookState = hookstate({

// })
// export { entireHookState }