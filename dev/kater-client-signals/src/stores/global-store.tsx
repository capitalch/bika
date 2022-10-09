import { deepSignal } from "../common/misc/preact-deepsignal"
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
        globalStore.dialog.content.value = () => <></>
        globalStore.dialog.isClosable.value = true
        globalStore.dialog.showDialog.value = false
        globalStore.dialog.title.value = ''
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
        globalStore.loginInfo.isLoggedIn.value = false
        globalStore.loginInfo.token.value = ''
        globalStore.loginInfo.userType.value = ''
        globalStore.loginInfo.uid.value = ''
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

let globalStore:any = deepSignal(appStore)
function resetGlobalStore() {
    // appStoreClone = _.cloneDeep(appStore)
    globalStore = deepSignal(appStore)
    globalStore.value.resetLoginInfo()
}

export {globalStore, resetGlobalStore}