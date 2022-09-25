import { proxy } from 'valtio'
import _ from 'lodash'
import { sideBarMainMenu } from '../common/navigation/side-bar/app-navigation-side-bar-menus'

const appStore = {
    dialog: {
        content: () => <></>,
        isClosable: true,
        showDialog: false,
        title: '',
    },

    dialog1: {
        content: () => <></>,
        isClosable: true,
        showDialog: false,
        title: '',
    },

    resetDialog: () => {
        globalStore.dialog.content = () => <></>
        globalStore.dialog.isClosable = true
        globalStore.dialog.showDialog = false
        globalStore.dialog.title = ''
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
        currentComponent: () => <></>,
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
}
let appStoreClone = _.cloneDeep(appStore)

let globalStore = proxy(appStoreClone)

function resetGlobalStore() {
    appStoreClone = _.cloneDeep(appStore)
    globalStore = proxy(appStoreClone)
    globalStore.resetLoginInfo()
}

export { globalStore, resetGlobalStore }
