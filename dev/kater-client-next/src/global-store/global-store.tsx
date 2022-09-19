import { proxy, } from 'valtio'
import _ from 'lodash'
import { sideBarMainMenu } from '../components/app-navigation/side-bar/app-navigation-side-bar-menus'

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
let appStateClone = _.cloneDeep(appStore)

const globalStore = proxy(
    appStateClone
)

export { globalStore }