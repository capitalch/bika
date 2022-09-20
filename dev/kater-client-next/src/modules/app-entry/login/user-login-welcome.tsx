import {
    AppMaterialDialog,
    globalStore,
    useEffect,
    useSnapshot,
} from '../../../shared-utils/redirect'
import { LoginContent } from './login-content'
import { WelcomeContent } from './welcome-content'

function UserLoginWelcome() {
    const snapLoginInfo = useSnapshot(globalStore.loginInfo)
    useEffect(() => {
        globalStore.dialog.showDialog = !snapLoginInfo.isLoggedIn
    })
    return (
        <AppMaterialDialog
            isClosable={snapLoginInfo.isLoggedIn ? true : false}
            Content={snapLoginInfo.isLoggedIn ? WelcomeContent : LoginContent}
        />
    )
}

export { UserLoginWelcome }


