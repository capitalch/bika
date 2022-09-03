import { CSSProperties, ThemeContext } from '@mui/styled-engine'
import { BasicMaterialDialog } from '../../components/common/basic-material-dialog'
import { authenticationHookState } from '../../hook-state/app-hookstate'
import {
    Box,
    TextField,
    Typography,
    useHookstate,
    useRef,
    useTheme,
} from '../../misc/redirect'
function UserLogin() {
    const authenticationGlobalState = useHookstate(authenticationHookState)

    const meta = useRef({
        dialogConfig: {
            showDialog: !authenticationGlobalState.isLoggedIn.get(),
            title: 'User login',
            content: LoginContent,
        },
    })
    // return <XContent />
    return <BasicMaterialDialog meta={meta} />
}

export { UserLogin }

function LoginContent() {
    const theme = useTheme()
    const userLocalState = useHookstate({ uid: '', pwd: '' })
    return (
        <Box sx={getStyles()}>
            <Typography variant="subtitle2" sx={{ mb: theme.spacing(0.2) }}>
                User id
            </Typography>
            <TextField size="small"></TextField>
            <Typography
                variant="subtitle2"
                sx={{ mt: theme.spacing(3), mb: theme.spacing(0.2) }}>
                Password
            </Typography>
            <TextField
            
                size="small"
                type="password"
                onChange={(e:any)=>userLocalState.pwd.set(e.target.value)}
                value={userLocalState.pwd.get()}></TextField>
        </Box>
    )

    function getStyles() {
        const styles: CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: theme.spacing(40),
            height: theme.spacing(21),
            // border:'1px solid lightGrey',
            // padding: theme.spacing(3)
        }
        return styles
    }
}
