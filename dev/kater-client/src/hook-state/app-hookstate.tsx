import { cateringMenu } from '../components/app-main-header-catering-menu'
import { hookstate } from '../misc/redirect'

const appMainHookState = hookstate({
    open: false,
    selectedMenu:cateringMenu,
    currentComponentName: 'cateringHome'
})
export { appMainHookState }