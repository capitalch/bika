import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    useSnapshot,
    TextField,
    Typography,
} from '../../../common/misc/redirect'
import { superAdminStore } from '../../../stores/super-admin-store'
import { useSuperAdminClientsForm } from './super-admin-clients-form-hook'

function SuperAdminClientForm() {
    const { checkErrors, getSxStyles, onCancel, onSubmit } = useSuperAdminClientsForm()
    const snapForm = useSnapshot(superAdminStore.clients.form)
    const clientForm = superAdminStore.clients.form
    const { checkClientName, checkShortCode } = checkErrors()
    return (
        <Box sx={getSxStyles()}>
            {/* clientName */}
            <TextField
                color="primary"
                error={!!snapForm.clientNameError}
                helperText={<Typography variant='caption'>{snapForm.clientNameError}</Typography>}
                label='Client name'
                onChange={(e: any) => {
                    clientForm.clientName = e.target.value
                    checkClientName(e.target.value)
                }}
                size="small"
                value={snapForm.clientName || ''}
                variant="standard"
            />
            {/* shortCode */}
            <TextField
                className='input'
                color="primary"
                error={!!snapForm.shortCodeError}
                helperText={<Typography variant='caption'>{snapForm.shortCodeError}</Typography>}
                label='Short code'
                onChange={(e: any) => {
                    clientForm.shortCode = e.target.value
                    checkShortCode(e.target.value)
                }}
                size="small"
                value={snapForm.shortCode || ''}
                variant="standard"
            />
            {/* remarks */}
            <TextField
                className='input'
                color="primary"
                label='Remarks'
                onChange={(e: any) => {
                    clientForm.remarks = e.target.value
                }}
                size="small"
                value={snapForm.remarks || ''}
                variant="standard"
            />
            {/* isActive */}
            <FormControlLabel
                className='input'
                control={<Checkbox defaultChecked />}
                label="Active"
                onChange={(e: any) => {
                    clientForm.isActive = e.target.checked
                }}
                value={clientForm.isActive}
            />
            <Box className='cancel-submit'>
                <Button className='button' variant='contained' color='warning' onClick={onCancel}>Cancel</Button>
                <Button className='button' disabled={(!!snapForm.clientNameError) || (!!clientForm.shortCodeError)}
                    variant='contained'
                    size='medium'
                    onClick={onSubmit}>Submit</Button>
            </Box>
            <Typography variant='caption' className='server-error'>{snapForm.serverError}</Typography>
        </Box>
    )
}
export { SuperAdminClientForm }
