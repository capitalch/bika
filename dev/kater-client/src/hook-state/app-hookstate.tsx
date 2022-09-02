import { cateringMenu } from '../components/app-main/app-main-header-catering-menu'
import { hookstate } from '../misc/redirect'

const appMainHookState = hookstate({
    open: false, // drawer open
    selectedMenu: cateringMenu,
    currentComponentName: 'cateringHome',
})
export { appMainHookState }

const authentication = hookstate({
    isLoggedIn:false,
    uid:undefined,
    pwd:undefined,    
})
