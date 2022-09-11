import { mainMenu } from '../components/app-client/app-client-main-menu'
import { hookstate } from '../misc/redirect'

const appMainHookState = hookstate({
    open: false, // drawer open or close
    selectedMenu: mainMenu,
    currentComponentName: 'cateringHome',
    isLoading: false,
    dialog: {
        showDialog: false,
        title: ''
    },
    appUser: {
        isLoggedIn: false,
        token: '',
        userType: '',
        uid: '',
    }
})
export { appMainHookState }

// const entireHookState = hookstate({

// })
// export { entireHookState }