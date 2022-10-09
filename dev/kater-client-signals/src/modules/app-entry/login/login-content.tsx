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
    useDeepSignal,
    useEffect,
    useTheme,
} from '../../../common/misc/redirect'
import { Buffer } from 'buffer'
import { SuperAdminMain } from '../super-admin/super-admin-main'

function LoginContent() {
    const storeObject = {
        uid: 'superAdmin',
        pwd: 'superAdmin@123',
        uidError: '',
        pwdError: '',
        serverError: '',
    }
    
    let localStore: any = useDeepSignal(storeObject)
    const theme = useTheme()
    const { queryGraphql } = useAppGraphql()
    const { checkPwdError, checkUidError } = globalValidators()

    useEffect(() => {
        globalStore.dialog.title.value = 'User login'
    })

    const isSubmitDisabled =
        localStore.uid.value.length === 0 ||
        localStore.pwd.value.length === 0 ||
        localStore.uidError.value.length > 0 ||
        localStore.pwdError.value.length > 0

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
                    localStore.uid.value = e.target.value
                    localStore.uidError.value =
                        checkUidError(e.target.value) || ''
                    localStore.serverError.value = ''
                }}
                value={localStore.uid}
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
                        {localStore.uidError.value}
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
                error={localStore.pwdError.value.length > 0}
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
                        {localStore.pwdError.value}
                    </Typography>
                }
                onChange={(e: any) => {
                    localStore.pwdError.value = checkPwdError(e.target.value)
                    localStore.pwd.value = e.target.value
                    localStore.serverError.value = ''
                }}
                value={localStore.pwd.value}></TextField>

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
                {localStore.serverError.value}
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
        localStore.uidError.value = checkUidError(localStore.uid.value)
        localStore.pwdError.value = checkPwdError(localStore.pwd.value)

        if (
            localStore.uidError.value.length === 0 &&
            localStore.pwdError.value.length === 0
        ) {
            globalStore.misc.showLoadingDialog.value = true
            const utcTime = new Date().getTime().toString()
            const encryptedUtcTime = cryptoEncrypt(utcTime)

            globalStore.loginInfo.token.value = encryptedUtcTime
            const cred = localStore.uid.value.concat(':', localStore.pwd.value)
            const credentials = Buffer.from(cred).toString('base64')

            const queryString = appGraphqlStrings['login']
            try {
                localStore.serverError.value = ''
                const ret = await queryGraphql(queryString(credentials))
                processSubmitResult(ret)
            } catch (e: any) {
                console.log(e.message)
                resetAllStates()
                localStore.serverError.value = e.message
            } finally {
                globalStore.misc.showLoadingDialog.value = false
            }
        }

        function processSubmitResult(ret: any) {
            if (ret) {
                const payload = getPayloadFromGraphqlObject(ret, 'doLogin')
                if (payload.isSuccess) {
                    globalStore.loginInfo.isLoggedIn.value = true
                    globalStore.loginInfo.token.value = payload.token
                    globalStore.loginInfo.uid.value = localStore.uid.value
                    globalStore.loginInfo.userType.value = payload.userType

                    globalStore.dialog.showDialog.value = false
                    if (globalStore.loginInfo.userType.value === 'S') {
                        loadComponent(SuperAdminMain)
                    }
                } else {
                    localStore.serverError.value = messages.messLoginFailed
                    resetAllStates()
                }
                console.log(payload)
            } else {
                resetAllStates()
                localStore.serverError.value = messages.messConnectionError
            }
        }
    }

    function handlePwdClear() {
        localStore.pwd.value = ''
    }

    function handleUidClear() {
        localStore.uid.value = ''
    }

    function resetAllStates() {
        localStore.uid.value = ''
        localStore.pwd.value = ''
        localStore.uidError.value = ''
        localStore.pwdError.value = ''
        globalStore.value.resetLoginInfo()
    }
}
export { LoginContent }
