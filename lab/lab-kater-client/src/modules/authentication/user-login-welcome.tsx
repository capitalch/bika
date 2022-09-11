import { CSSProperties } from '@mui/styled-engine'
// import { buffer } from 'node:stream/consumers'
import { AppMaterialDialog } from '../../components/common/app-material-dialog'
import { appHookState } from '../../hook-state/app-hookstate'

import {
    appGraphqlStrings,
    Box,
    Button,
    CloseIcon,
    cryptoEncrypt,
    getPayloadFromGraphqlObject,
    globalValidators,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    messages,
    PasswordIcon,
    PersonIcon,
    TextField,
    Typography,
    useAppGraphql,
    useEffect,
    useHookstate,
    useTheme,
} from '../../misc/redirect'
import { Buffer } from 'buffer'
// import Cryptojs from 'crypto-js'
// const Cryptojs = require('crypto-js')

function UserLoginWelcome() {
    const appGlobalState = useHookstate(appHookState)
    useEffect(() => {
        appGlobalState.dialog.showDialog.set(
            !appGlobalState.loginInfo.isLoggedIn.get()
        )
    })
    const isLoggedIn = appGlobalState.loginInfo.isLoggedIn.get()
    return (
        <AppMaterialDialog
            isClosable={isLoggedIn ? true : false}
            Content={isLoggedIn ? WelcomeContent : LoginContent}
        />
    )
}

export { UserLoginWelcome }

function LoginContent() {
    const theme = useTheme()
    const { queryGraphql } = useAppGraphql()
    const appGlobalState = useHookstate(appHookState)
    const { checkPwdError, checkUidError } = globalValidators()
    const userLocalState = useHookstate({
        uid: 'superAdmin',
        pwd: 'superAdmin@123',
        uidError: '',
        pwdError: '',
        serverError: '',
    })
    useEffect(() => {
        appGlobalState.dialog.title.set('User login')
    })

    const isSubmitDisabled =
        userLocalState.uid.get().length === 0 ||
        userLocalState.pwd.get().length === 0 ||
        userLocalState.uidError.get().length > 0 ||
        userLocalState.pwdError.get().length > 0

    return (
        <Box sx={getStyles()}>
            <Typography component="div" sx={{ mb: theme.spacing(0.3) }}>
                <Typography variant="subtitle2" component="span">
                    User id or email
                </Typography>
                <Typography component="span" color={theme.palette.error.light}>
                    {' '}
                    *
                </Typography>
            </Typography>

            {/* uid */}
            <TextField
                id="uid1"
                autoComplete="off"
                size="small"
                autoFocus
                required
                onChange={(e: any) => {
                    userLocalState.uidError.set(
                        checkUidError(e.target.value) ?? ''
                    )
                    userLocalState.uid.set(e.target.value)
                    userLocalState.serverError.set('')
                }}
                value={userLocalState.uid.get()}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton size="small" onClick={handleUidClear} tabIndex={-1}>
                                <CloseIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                helperText={
                    <Typography component="span" variant="caption">
                        {userLocalState.uidError.get()}
                    </Typography>
                }></TextField>

            <Typography
                component="div"
                sx={{ mt: theme.spacing(1), mb: theme.spacing(0.3) }}>
                <Typography variant="subtitle2" component="span">
                    Password
                </Typography>
                <Typography component="span" color={theme.palette.error.light}>
                    {' '}
                    *
                </Typography>
            </Typography>

            {/* pwd */}
            <TextField
                id="pwd1"
                autoComplete="new-password"
                // defaultValue="demoUser1!"
                size="small"
                type="password"
                error={userLocalState.pwdError.get().length > 0}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton size="small" onClick={handlePwdClear} tabIndex={-1}>
                                <CloseIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                helperText={
                    <Typography component="span" variant="caption">
                        {userLocalState.pwdError.get()}
                    </Typography>
                }
                onChange={(e: any) => {
                    userLocalState.pwdError.set(checkPwdError(e.target.value))
                    userLocalState.pwd.set(e.target.value)
                    userLocalState.serverError.set('')
                }}
                value={userLocalState.pwd.get()}></TextField>

            {/* Submit */}
            <Button
                size="large"
                variant="contained"
                sx={{ mt: theme.spacing(2) }}
                onClick={handleSubmit}
                disabled={isSubmitDisabled}>
                Submit
            </Button>
            <Typography sx={{ mt: theme.spacing(1) }} variant='caption'>{userLocalState.serverError.get()}</Typography>
        </Box>
    )

    function getStyles() {
        const styles: CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: theme.spacing(35),
            height: 'auto',
        }
        return styles
    }

    async function handleSubmit() {
        checkUidError(userLocalState.uid.get())
        checkPwdError(userLocalState.pwd.get())
        if (
            userLocalState.uidError.get().length === 0 &&
            userLocalState.pwdError.get().length === 0
        ) {
            appGlobalState.isLoading.set(true)
            const utcTime = new Date().getTime().toString()
            const encryptedUtcTime = cryptoEncrypt(utcTime)

            appGlobalState.loginInfo.token.set(encryptedUtcTime)
            const cred = userLocalState.uid
                .get()
                .concat(':', userLocalState.pwd.get())
            const credentials = Buffer.from(cred).toString('base64')

            const queryString = appGraphqlStrings['login']
            try {
                userLocalState.serverError.set('')
                const ret = await queryGraphql(queryString(credentials))
                if (ret) {
                    const payload = getPayloadFromGraphqlObject(ret, 'doLogin')
                    if (payload.isSuccess) {
                        appGlobalState.loginInfo.merge({
                            isLoggedIn: true,
                            token: payload.token,
                            uid: userLocalState.uid.get(),
                            userType: payload.userType
                        })
                    } else {
                        userLocalState.serverError.set(messages.messLoginFailed)
                        resetAllStates()
                    }
                    console.log(payload)
                } else {
                    resetAllStates()
                    userLocalState.serverError.set(messages.messConnectionError)
                }

            } catch (e: any) {
                console.log(e.message)
                resetAllStates()
                userLocalState.serverError.set(e.message)
            }
            finally {
                appGlobalState.isLoading.set(false)
            }
            // setTimeout(() => {
            //     appGlobalState.isLoading.set(false)
            //     appGlobalState.loginInfo.uid.set('demoUser')
            //     appGlobalState.dialog.showDialog.set(false)
            //     appGlobalState.loginInfo.isLoggedIn.set(true)
            // }, 100)
        }
    }

    function handlePwdClear() {
        userLocalState.pwd.set('')
    }

    function handleUidClear() {
        userLocalState.uid.set('')
    }

    function resetAllStates() {
        userLocalState.merge({
            uid: '',
            pwd: '',
            uidError: '',
            pwdError: '',
            // serverError: '',
        })
        appGlobalState.loginInfo.merge({ isLoggedIn: false, token: '', userType: '', uid: '' })
    }
}

function WelcomeContent() {
    const theme = useTheme()
    const appGlobalState = useHookstate(appHookState)
    useEffect(() => {
        appGlobalState.dialog.title.set(
            `Welcome ${appGlobalState.loginInfo.uid.get()}`
        )
    })
    return (
        <Box sx={getStyles()}>
            <List disablePadding component="div">
                <ListItem
                    key="1"
                    disableGutters
                    divider
                    disablePadding
                    sx={{
                        border: '1px solid lightGrey',
                        mb: theme.spacing(2),
                    }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText>Change user id</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem
                    key="2"
                    disableGutters
                    divider
                    disablePadding
                    sx={{ border: '1px solid lightGrey' }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PasswordIcon />
                        </ListItemIcon>
                        <ListItemText>Change password</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <Button
                sx={{ mt: theme.spacing(2) }}
                variant="contained"
                onClick={handleSubmit}>
                Log out
            </Button>
        </Box>
    )
    function getStyles() {
        const styles: CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: theme.spacing(35),
            height: 'auto',
        }
        return styles
    }
    // logout
    function handleSubmit() {
        // const loginInfo = entireGlobalState.loginInfo.get()
        // const user = immer(loginInfo,(old:any)=>{
        //     old.isLoggedIn.set(false)
        //     old.uid.set('')
        // })
        appGlobalState.loginInfo.merge({
            isLoggedIn: false,
            uid: '',
        })
        // entireGlobalState.loginInfo.isLoggedIn.set(false)
        // entireGlobalState.loginInfo.uid.set('')

        appGlobalState.open.set(false)
        // appGlobalState.dialog.showDialog.set(false)
    }
}


// const privateKey: any = process.env.REACT_APP_LOGIN_TIME_KEY || ''
// const key = Cryptojs.enc.Utf8.parse(privateKey)
// let key = 'AAAAAAAAAAAAAAAA'
// const text = 'This is a test'

// key = Cryptojs.enc.Utf8.parse(key);
// const encrypted2 = Cryptojs.AES.encrypt(text, key, {
//     mode: Cryptojs.mode.ECB,
// })
// const enc = encrypted2.toString()

// const decr = Cryptojs.AES.decrypt(encryptedUtcTime, key, {
//     mode: Cryptojs.mode.ECB,
// }).toString(
//     Cryptojs.enc.Utf8
// )