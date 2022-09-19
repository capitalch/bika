import { CSSProperties } from '@mui/styled-engine'
import {
    appGraphqlStrings,
    AppMaterialDialog,
    Box,
    Button,
    CloseIcon,
    cryptoEncrypt,
    getPayloadFromGraphqlObject,
    globalStore,
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
    useSnapshot,
    useTheme,
} from '../../misc/redirect'
import { Buffer } from 'buffer'

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

function LoginContent() {
    const theme = useTheme()
    const { queryGraphql } = useAppGraphql()
    const { checkPwdError, checkUidError } = globalValidators()
    const userLocalState = useHookstate({
        uid: 'superAdmin',
        pwd: 'superAdmin@123',
        uidError: '',
        pwdError: '',
        serverError: '',
    })
    useEffect(() => {
        globalStore.dialog.title = 'User login'
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
                            <IconButton
                                size="small"
                                onClick={handleUidClear}
                                tabIndex={-1}>
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
                size="small"
                type="password"
                error={userLocalState.pwdError.get().length > 0}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                onClick={handlePwdClear}
                                tabIndex={-1}>
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
            <Typography sx={{ mt: theme.spacing(1) }} variant="caption">
                {userLocalState.serverError.get()}
            </Typography>
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
        userLocalState.uidError.set(checkUidError(userLocalState.uid.get()))
        userLocalState.pwdError.set(checkPwdError(userLocalState.pwd.get()))
        if (
            userLocalState.uidError.get().length === 0 &&
            userLocalState.pwdError.get().length === 0
        ) {
            globalStore.misc.showLoadingDialog = true
            const utcTime = new Date().getTime().toString()
            const encryptedUtcTime = cryptoEncrypt(utcTime)

            globalStore.loginInfo.token = encryptedUtcTime
            const cred = userLocalState.uid
                .get()
                .concat(':', userLocalState.pwd.get())
            const credentials = Buffer.from(cred).toString('base64')

            const queryString = appGraphqlStrings['login']
            try {
                userLocalState.serverError.set('')
                const ret = await queryGraphql(queryString(credentials))
                processSubmitResult(ret)
            } catch (e: any) {
                console.log(e.message)
                resetAllStates()
                userLocalState.serverError.set(e.message)
            } finally {
                globalStore.misc.showLoadingDialog = false
            }
        }

        function processSubmitResult(ret: any) {
            if (ret) {
                const payload = getPayloadFromGraphqlObject(ret, 'doLogin')
                if (payload.isSuccess) {
                    globalStore.loginInfo = {
                        isLoggedIn: true,
                        token: payload.token,
                        uid: userLocalState.uid.get(),
                        userType: payload.userType,
                    }
                    globalStore.dialog.showDialog= false
                    if (globalStore.loginInfo.userType === 'S') {
                        globalStore.misc.currentComponentName = 'superAdminTenant'
                    }
                } else {
                    userLocalState.serverError.set(messages.messLoginFailed)
                    resetAllStates()
                }
                console.log(payload)
            } else {
                resetAllStates()
                userLocalState.serverError.set(messages.messConnectionError)
            }
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
        })
        // appglobalStore.loginInfo.merge({
        // isLoggedIn: false,
        // token: '',
        // userType: '',
        // uid: '',
        // })
        globalStore.loginInfo = {
            isLoggedIn: false,
            token: '',
            userType: '',
            uid: '',
        }
        globalStore.misc.currentComponentName = ''
        // appglobalStore.misc.merge({
        //     currentComponentName: ''
        // })
    }
}

function WelcomeContent() {
    const theme = useTheme()
    const snapLoginInfo = useSnapshot(globalStore.loginInfo)
    useEffect(() => {
        globalStore.dialog.title = `Welcome ${snapLoginInfo.uid}`
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
        // const clone = _.cloneDeep(appHook)
        // appglobalStore.merge(clone)

        // appglobalStore.loginInfo.merge({
        //     isLoggedIn: false,
        //     token: '',
        //     userType: '',
        //     uid: '',
        // })
        // appglobalStore.misc.merge({
        //     open:false,
        //     currentComponentName: ''
        // })
    }
}
