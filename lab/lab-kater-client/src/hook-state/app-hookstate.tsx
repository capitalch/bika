import { cateringMenu } from '../components/app-main/app-main-catering-menu'
import { hookstate } from '../misc/redirect'

const appMainHookState = hookstate({
    open: false, // drawer open or close
    selectedMenu: cateringMenu,
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