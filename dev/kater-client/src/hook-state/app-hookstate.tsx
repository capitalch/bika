import { cateringMenu } from '../components/app-main/app-main-catering-menu'
import { hookstate } from '../misc/redirect'

const appMainHookState = hookstate({
    open: false, // drawer open
    selectedMenu: cateringMenu,
    currentComponentName: 'cateringHome',
})
export { appMainHookState }

const authenticationHookState = hookstate({
    isLoggedIn: false,
    token: undefined,
    // uid:undefined,
    // pwd:undefined,
})
export { authenticationHookState }
