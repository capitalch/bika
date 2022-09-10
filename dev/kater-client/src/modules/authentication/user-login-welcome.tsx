import { CSSProperties } from '@mui/styled-engine'
// import { buffer } from 'node:stream/consumers'
import { AppMaterialDialog } from '../../components/common/app-material-dialog'
import { appHookState } from '../../hook-state/app-hookstate'

import {
    appGraphqlStrings,
    Box,
    Button,
    CloseIcon,
    globalValidators,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
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
const Cryptojs = require('crypto-js')

function UserLoginWelcome() {
    const appGlobalState = useHookstate(appHookState)
    useEffect(() => {
        appGlobalState.dialog.showDialog.set(
            !appGlobalState.appUser.isLoggedIn.get()
        )
    })
    const isLoggedIn = appGlobalState.appUser.isLoggedIn.get()
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
        uid: 'demo',
        pwd: 'demo123#',
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
                // defaultValue="demo"
                onChange={(e: any) => {
                    userLocalState.uidError.set(
                        checkUidError(e.target.value) ?? ''
                    )
                    userLocalState.uid.set(e.target.value)
                }}
                value={userLocalState.uid.get()}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton size="small" onClick={handleUidClear}>
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
                            <IconButton size="small" onClick={handlePwdClear}>
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
            const utcTime = new Date().toISOString()
            const privateKey: any = process.env.REACT_APP_LOGIN_TIME_KEY || ''
            let key = 'AAAAAAAAAAAAAAAA'
            const text = 'This is a test'

            key = Cryptojs.enc.Utf8.parse(key);
            const encrypted2 = Cryptojs.AES.encrypt(text, key, {
                mode: Cryptojs.mode.ECB,
            }) 
            // const encrypted1 = Cryptojs.AES.encrypt(text, key, {
            //     mode: Cryptojs.mode.ECB,
            // }) 
            const enc = encrypted2.toString()
            console.log(enc)
            const decr = Cryptojs.AES.decrypt(encrypted2, key, {
                mode: Cryptojs.mode.ECB,
            }).toString(
                Cryptojs.enc.Utf8
            )
            appGlobalState.appUser.token.set(enc)
            const cred = userLocalState.uid
                .get()
                .concat(':', userLocalState.pwd.get())
            const credentials = Buffer.from(cred).toString('base64')
            // const payload = {
            //     cred: credentials,
            //     time: encrypted,
            // }
            // const escaped = encodeURI(JSON.stringify(payload))
            const queryString = appGraphqlStrings['login']
            const ret = await queryGraphql(queryString(credentials))
            setTimeout(() => {
                appGlobalState.isLoading.set(false)
                appGlobalState.appUser.uid.set('demoUser')
                // entireGlobalState.appUser.uid.set(userLocalState.uid.get())
                appGlobalState.dialog.showDialog.set(false)
                appGlobalState.appUser.isLoggedIn.set(true)
            }, 100)
        }
    }

    function handlePwdClear() {
        userLocalState.pwd.set('')
    }

    function handleUidClear() {
        userLocalState.uid.set('')
    }
}

function WelcomeContent() {
    const theme = useTheme()
    const appGlobalState = useHookstate(appHookState)
    useEffect(() => {
        appGlobalState.dialog.title.set(
            `Welcome ${appGlobalState.appUser.uid.get()}`
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
        // const appUser = entireGlobalState.appUser.get()
        // const user = immer(appUser,(old:any)=>{
        //     old.isLoggedIn.set(false)
        //     old.uid.set('')
        // })
        appGlobalState.appUser.merge({
            isLoggedIn: false,
            uid: '',
        })
        // entireGlobalState.appUser.isLoggedIn.set(false)
        // entireGlobalState.appUser.uid.set('')

        appGlobalState.open.set(false)
        // appGlobalState.dialog.showDialog.set(false)
    }
}
