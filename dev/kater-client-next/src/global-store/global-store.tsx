import { proxy } from 'valtio'
import _ from 'lodash'
import { sideBarMainMenu } from '../common/app-navigation/side-bar/app-navigation-side-bar-menus'

const appStore = {
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

    resetLoginInfo: () => {
        globalStore.loginInfo.isLoggedIn = false
        globalStore.loginInfo.token = ''
        globalStore.loginInfo.userType = ''
        globalStore.loginInfo.uid = ''
    },

    misc: {
        branchId: 1,
        currentComponentName: '',
        dbSchemaName: 'demo',
        headerMainMenuName: '',
        open: false, // drawer open or close
        sideBarMenu: sideBarMainMenu,
        showLoadingDialog: false,
    },

    successMessage: {
        show: false,
        message: 'Operation successful',
    },

    superAdmin: {
        clients: {
            xxGridState: {
                rows: [],
                rowsViewLimit: '100',
                searchString: '',
            },
        },
    },
}
let appStoreClone = _.cloneDeep(appStore)

let globalStore = proxy(appStoreClone)

function resetGlobalStore(){
    appStoreClone = _.cloneDeep(appStore)
    globalStore = proxy(appStoreClone)
    globalStore.resetLoginInfo()
}

const localStore = proxy({
    uid: 'superAdmin',
    pwd: 'superAdmin@123',
    uidError: '',
    pwdError: '',
    serverError: '',
})

export { globalStore, localStore, resetGlobalStore }
