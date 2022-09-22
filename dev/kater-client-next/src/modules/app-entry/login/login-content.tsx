import { CSSProperties } from '@mui/styled-engine'
import {
    appGraphqlStrings,
    Box,
    Button,
    CloseIcon,
    cryptoEncrypt,
    getPayloadFromGraphqlObject,
    globalStore,
    globalValidators,
    IconButton,
    InputAdornment,
    loadComponent,
    messages,
    TextField,
    Typography,
    useAppGraphql,
    useEffect,
    useRef,
    useState,
    useTheme,
} from '../../../common/misc/redirect'
import { Buffer } from 'buffer'
import { SuperAdminMain } from '../super-admin/super-admin-main'

function LoginContent() {
    const [, setRefresh] = useState({})
    const theme = useTheme()
    const { queryGraphql } = useAppGraphql()
    const { checkPwdError, checkUidError } = globalValidators()
    const meta: any = useRef({
        uid: 'superAdmin',
        pwd: 'superAdmin@123',
        uidError: '',
        pwdError: '',
        serverError: '',
    })
    const pre = meta.current
    
    useEffect(() => {
        globalStore.dialog.title = 'User login'
    })

    const isSubmitDisabled =
        pre.uid.length === 0 ||
        pre.pwd.length === 0 ||
        pre.uidError.length > 0 ||
        pre.pwdError.length > 0

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
                    pre.uid = e.target.value
                    pre.uidError = checkUidError(e.target.value) || ''
                    pre.serverError = ''
                    setRefresh({})
                }}
                value={
                    pre.uid
                }
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
                        {pre.uidError}
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
                autoComplete="new-password"
                size="small"
                type="password"
                error={pre.pwdError.length > 0}
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
                        {pre.pwdError}
                    </Typography>
                }
                onChange={(e: any) => {
                    pre.pwdError = checkPwdError(e.target.value)
                    pre.pwd = e.target.value
                    pre.serverError = ''
                    setRefresh({})
                }}
                value={pre.pwd}></TextField>

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
                {pre.serverError}
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

        pre.uidError = checkUidError(pre.uid)
        pre.pwdError = checkPwdError(pre.pwd)
        setRefresh({})

        if (
            pre.uidError.length === 0 &&
            pre.pwdError.length === 0
        ) {
            globalStore.misc.showLoadingDialog = true
            const utcTime = new Date().getTime().toString()
            const encryptedUtcTime = cryptoEncrypt(utcTime)

            globalStore.loginInfo.token = encryptedUtcTime
            const cred = pre.uid
                .concat(':', pre.pwd)
            const credentials = Buffer.from(cred).toString('base64')

            const queryString = appGraphqlStrings['login']
            try {
                pre.serverError = ''
                setRefresh({})
                const ret = await queryGraphql(queryString(credentials))
                processSubmitResult(ret)
            } catch (e: any) {
                console.log(e.message)
                resetAllStates()
                pre.serverError = e.message
                setRefresh({})
            } finally {
                globalStore.misc.showLoadingDialog = false
            }
        }

        function processSubmitResult(ret: any) {
            if (ret) {
                const payload = getPayloadFromGraphqlObject(ret, 'doLogin')
                if (payload.isSuccess) {
                    globalStore.loginInfo.isLoggedIn = true
                    globalStore.loginInfo.token = payload.token
                    globalStore.loginInfo.uid = pre.uid
                    globalStore.loginInfo.userType = payload.userType

                    globalStore.dialog.showDialog = false
                    if (globalStore.loginInfo.userType === 'S') {
                        loadComponent(SuperAdminMain)
                    }
                } else {
                    pre.serverError = messages.messLoginFailed
                    setRefresh({})
                    resetAllStates()
                }
                console.log(payload)
            } else {
                resetAllStates()
                pre.serverError = messages.messConnectionError
                setRefresh({})
            }
        }
    }

    function handlePwdClear() {
        pre.pwd = ''
        setRefresh({})
    }

    function handleUidClear() {
        pre.uid = ''
        setRefresh({})
}

function resetAllStates() {
    pre.uid = ''
    pre.pwd = ''
    pre.uidError = ''
    pre.pwdError = ''
    setRefresh({})
    globalStore.resetLoginInfo()
}
}
export {LoginContent}