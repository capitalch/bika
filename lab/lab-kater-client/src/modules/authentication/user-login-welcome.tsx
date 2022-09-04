import { CSSProperties, } from '@mui/styled-engine'
import { BasicMaterialDialog } from '../../components/common/basic-material-dialog'
import { appMainHookState, } from '../../hook-state/app-hookstate'
import {
    Box,
    Button,
    globalValidators,
    immer,
    TextField,
    Typography,
    useEffect,
    useHookstate,
    useTheme,
} from '../../misc/redirect'

function UserLoginWelcome() {
    // const entireGlobalState = useHookstate(entireHookState)
    const appMainGlobalState = useHookstate(appMainHookState)
    // appMainGlobalState.dialog.showDialog.set(!appMainGlobalState.appUser.isLoggedIn.get())
    useEffect(() => {
        appMainGlobalState.dialog.showDialog.set(!appMainGlobalState.appUser.isLoggedIn.get())
    })
    return <BasicMaterialDialog Content={appMainGlobalState.appUser.isLoggedIn.get() ? WelcomeContent : LoginContent} />
}

export { UserLoginWelcome }

function LoginContent() {
    const theme = useTheme()
    const appMainGlobalState = useHookstate(appMainHookState)
    // const entireGlobalState = useHookstate(entireHookState)
    const { checkPwdError, checkUidError } = globalValidators()
    const userLocalState = useHookstate({ uid: '', pwd: '', uidError: '', pwdError: '' })
    return (
        <Box sx={getStyles()}>

            <Typography component='div' sx={{ mb: theme.spacing(0.3) }}>
                <Typography variant="subtitle2" component='span'>User id or email</Typography>
                <Typography component='span' color={theme.palette.error.light}> *</Typography>
            </Typography>

            {/* uid */}
            <TextField autoComplete='off' size="small" autoFocus required
                onChange={(e: any) => {

                    userLocalState.uidError.set(checkUidError(e.target.value) ?? '')
                    userLocalState.uid.set(e.target.value)
                }}
                value={userLocalState.uid.get()}
                helperText={<Typography component='span' variant='caption' >{userLocalState.uidError.get()}</Typography>}
            ></TextField>

            <Typography component='div'
                sx={{ mt: theme.spacing(1), mb: theme.spacing(0.3) }}>
                <Typography variant="subtitle2" component='span'>Password</Typography>
                <Typography component='span' color={theme.palette.error.light}> *</Typography>
            </Typography>

            {/* pwd */}
            <TextField
                autoComplete='off'
                size="small"
                type="password"
                error={userLocalState.pwdError.get().length > 0}
                helperText={<Typography component='span' variant='caption'>{userLocalState.pwdError.get()}</Typography>}
                onChange={(e: any) => {
                    userLocalState.pwdError.set(checkPwdError(e.target.value))
                    userLocalState.pwd.set(e.target.value)
                }}
                value={userLocalState.pwd.get()}></TextField>

            {/* Submit */}
            <Button size='large' variant='contained' sx={{ mt: theme.spacing(2) }} onClick={handleSubmit}>Submit</Button>
        </Box>
    )

    function getStyles() {
        const styles: CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: theme.spacing(35),
            height: 'auto'
        }
        return styles
    }

    function handleSubmit() {
        appMainGlobalState.isLoading.set(true)
        setTimeout(() => {
            appMainGlobalState.isLoading.set(false)
            appMainGlobalState.appUser.uid.set('demoUser')

            // entireGlobalState.appUser.uid.set(userLocalState.uid.get())
            appMainGlobalState.dialog.showDialog.set(false)
            appMainGlobalState.appUser.isLoggedIn.set(true)
        }, (1000));
    }
}

function WelcomeContent() {
    const theme = useTheme()
    const appMainGlobalState = useHookstate(appMainHookState)
    // const entireGlobalState = useHookstate(entireHookState)
    return (
        <Box>
            Welcome
            <Button onClick={handleSubmit}>Log out</Button>
        </Box>
    )

    // logout
    function handleSubmit() {
        // const appUser = entireGlobalState.appUser.get()
        // const user = immer(appUser,(old:any)=>{
        //     old.isLoggedIn.set(false)
        //     old.uid.set('')
        // })
        appMainGlobalState.appUser.merge({
            isLoggedIn: false,
            uid: ''
        })
        // entireGlobalState.appUser.isLoggedIn.set(false)
        // entireGlobalState.appUser.uid.set('')

        appMainGlobalState.open.set(false)
        // appMainGlobalState.dialog.showDialog.set(false)
    }
}


