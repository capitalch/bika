import { CSSProperties } from '@mui/styled-engine'
import { BasicMaterialDialog } from '../../components/common/basic-material-dialog'
import { appMainHookState } from '../../hook-state/app-hookstate'
import {
    appGraphqlStrings,
    Box,
    Button,
    ClearIcon,
    CloseIcon,
    globalValidators,
    IconButton,
    immer,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    PasswordIcon,
    PersonIcon,
    TextField,
    Typography,
    useAppGraphql,
    useEffect,
    useHookstate,
    useTheme,
} from '../../misc/redirect'

function UserLoginWelcome() {
    const appMainGlobalState = useHookstate(appMainHookState)
    useEffect(() => {
        appMainGlobalState.dialog.showDialog.set(
            !appMainGlobalState.appUser.isLoggedIn.get()
        )
    })
    const isLoggedIn = appMainGlobalState.appUser.isLoggedIn.get()
    return (
        <BasicMaterialDialog
            isClosable={isLoggedIn ? true : false}
            Content={isLoggedIn ? WelcomeContent : LoginContent}
        />
    )
}

export { UserLoginWelcome }

function LoginContent() {
    const theme = useTheme()
    const { queryGraphql } = useAppGraphql()
    const appMainGlobalState = useHookstate(appMainHookState)
    const { checkPwdError, checkUidError } = globalValidators()
    const userLocalState = useHookstate({
        uid: '',
        pwd: '',
        uidError: '',
        pwdError: '',
    })
    useEffect(() => {
        appMainGlobalState.dialog.title.set('User login')
    })
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
                autoComplete="off"
                size="small"
                autoFocus
                required
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
                autoComplete="off"
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
                onClick={handleSubmit}>
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
        appMainGlobalState.isLoading.set(true)
        const ret = await queryGraphql(appGraphqlStrings['login']('abcd'))
        setTimeout(() => {
            appMainGlobalState.isLoading.set(false)
            appMainGlobalState.appUser.uid.set('demoUser')
            // entireGlobalState.appUser.uid.set(userLocalState.uid.get())
            appMainGlobalState.dialog.showDialog.set(false)
            appMainGlobalState.appUser.isLoggedIn.set(true)
        }, 100)
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
    const appMainGlobalState = useHookstate(appMainHookState)
    useEffect(() => {
        appMainGlobalState.dialog.title.set(
            `Welcome ${appMainGlobalState.appUser.uid.get()}`
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
        appMainGlobalState.appUser.merge({
            isLoggedIn: false,
            uid: '',
        })
        // entireGlobalState.appUser.isLoggedIn.set(false)
        // entireGlobalState.appUser.uid.set('')

        appMainGlobalState.open.set(false)
        // appMainGlobalState.dialog.showDialog.set(false)
    }
}
