import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    // useSnapshot,
    TextField,
    Typography,
} from '../../../common/misc/redirect'
import { superAdminStore } from '../../../stores/super-admin-store'
import { useSuperAdminClientsForm } from './super-admin-clients-form-hook'

function SuperAdminClientForm() {
    const { checkErrors, getSxStyles, onCancel, onSubmit } = useSuperAdminClientsForm()
    const clientForm:any = superAdminStore.clients.form
    const { checkClientName, checkShortCode } = checkErrors()
    return (
        <Box sx={getSxStyles()}>
            {/* clientName */}
            <TextField
                color="primary"
                error={!!clientForm.clientNameError.value}
                helperText={<Typography variant='caption'>{clientForm.clientNameError.value}</Typography>}
                label='Client name'
                onChange={(e: any) => {
                    clientForm.clientName.value = e.target.value
                    checkClientName(e.target.value)
                }}
                size="small"
                value={clientForm.clientName.value || ''}
                variant="standard"
            />
            {/* shortCode */}
            <TextField
                className='input'
                color="primary"
                error={!!clientForm.shortCodeError.value}
                helperText={<Typography variant='caption'>{clientForm.shortCodeError.value}</Typography>}
                label='Short code'
                onChange={(e: any) => {
                    clientForm.shortCode.value = e.target.value
                    checkShortCode(e.target.value)
                }}
                size="small"
                value={clientForm.shortCode.value || ''}
                variant="standard"
            />
            {/* remarks */}
            <TextField
                className='input'
                color="primary"
                label='Remarks'
                onChange={(e: any) => {
                    clientForm.remarks.value = e.target.value
                }}
                size="small"
                value={clientForm.remarks.value || ''}
                variant="standard"
            />
            {/* isActive */}
            <FormControlLabel
                className='input'
                control={<Checkbox defaultChecked />}
                label="Active"
                onChange={(e: any) => {
                    clientForm.isActive.value = e.target.checked
                }}
                value={clientForm.isActive.value}
            />
            <Box className='cancel-submit'>
                <Button className='button' variant='contained' color='warning' onClick={onCancel}>Cancel</Button>
                <Button className='button' disabled={(!!clientForm.clientNameError.value) || (!!clientForm.shortCodeError.value)}
                    variant='contained'
                    size='medium'
                    onClick={onSubmit}>Submit</Button>
            </Box>
            <Typography variant='caption' className='server-error'>{clientForm.serverError.value}</Typography>
        </Box>
    )
}
export { SuperAdminClientForm }
