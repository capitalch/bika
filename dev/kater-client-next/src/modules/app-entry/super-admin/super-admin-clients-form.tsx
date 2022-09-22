import {
    Box,
    Checkbox,
    FormControlLabel,
    SxProps,
    TextField,
    Typography,
    useTheme,
} from '../../../shared-utils/redirect'
import { useSuperAdminClientsForm } from './super-admin-clients-form-hook'
function SuperAdminClientForm() {
    const {getSxStyles} = useSuperAdminClientsForm()
    return (
        <Box sx={getSxStyles()}>
            <TextField
                label={<Typography>Client name</Typography>}
                variant="standard"
                size="small"
                color="primary"
                sx={{ mt: 0, pt: 0 }}
            />
            <TextField
                className="input"
                label={<Typography>Short code</Typography>}
                variant="standard"
                size="small"
            />
            <TextField
                className="input"
                label={<Typography>Remarks</Typography>}
                variant="standard"
                size="small"
            />
            <FormControlLabel
                className='input'
                label="Active"
                control={<Checkbox defaultChecked />}
            />
        </Box>
    )
}
export { SuperAdminClientForm }
