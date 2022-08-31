import { cateringMenu } from '../components/app-main/app-main-header'
import { hookstate } from '../misc/redirect'

const appMainHookState = hookstate({
    open: false,
    cateringMenu:cateringMenu
})
export { appMainHookState }