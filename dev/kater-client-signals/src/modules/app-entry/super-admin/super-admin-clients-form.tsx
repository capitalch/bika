import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from '../../../common/misc/redirect'
import { JsonFormType } from '../../../react-form/interfaces'
import { ReactForm } from '../../../react-form/react-form'
import { superAdminStore } from '../../../stores/super-admin-store'
import { useSuperAdminClientsForm } from './super-admin-clients-form-hook'

function SuperAdminClientForm1() {
    jsonFormClient.submit.onSubmit = handleOnSubmit
    return <ReactForm jsonForm={jsonFormClient} />

    function handleOnSubmit(store: any) {
        store.serverError.value = 'abcd'
    }
}

function SuperAdminClientForm() {
    const { checkErrors, getSxStyles, onCancel, onSubmit } =
        useSuperAdminClientsForm()
    const clientForm: any = superAdminStore.clients.form
    const { checkClientName, checkShortCode } = checkErrors()
    return (
        <Box sx={getSxStyles()}>
            {/* clientName */}
            <TextField
                color="primary"
                error={!!clientForm.clientNameError.value}
                helperText={
                    <Typography variant="caption">
                        {clientForm.clientNameError.value}
                    </Typography>
                }
                label="Client name"
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
                className="input"
                color="primary"
                error={!!clientForm.shortCodeError.value}
                helperText={
                    <Typography variant="caption">
                        {clientForm.shortCodeError.value}
                    </Typography>
                }
                label="Short code"
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
                className="input"
                color="primary"
                label="Remarks"
                onChange={(e: any) => {
                    clientForm.remarks.value = e.target.value
                }}
                size="small"
                value={clientForm.remarks.value || ''}
                variant="standard"
            />
            {/* isActive */}
            <FormControlLabel
                className="input"
                control={<Checkbox defaultChecked />}
                label="Active"
                onChange={(e: any) => {
                    clientForm.isActive.value = e.target.checked
                }}
                value={clientForm.isActive.value}
            />
            <Box className="cancel-submit">
                <Button
                    className="button"
                    variant="contained"
                    color="warning"
                    onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    className="button"
                    disabled={
                        !!clientForm.clientNameError.value ||
                        !!clientForm.shortCodeError.value
                    }
                    variant="contained"
                    size="medium"
                    onClick={onSubmit}>
                    Submit
                </Button>
            </Box>
            <Typography variant="caption" className="server-error">
                {clientForm.serverError.value}
            </Typography>
        </Box>
    )
}
export { SuperAdminClientForm, SuperAdminClientForm1 }

const jsonFormClient: JsonFormType = {
    items: [
        {
            name: 'clientName',
            label: 'Client name',
            typeName: 'TextMaterial',
            validations: ['required'],
        },
        {
            name: 'shortCode',
            label: 'Short code',
            typeName: 'TextMaterial',
            validations: ['required'],
        },
        {
            name: 'isActive',
            label: 'Active',
            typeName: 'CheckBoxMaterial',
            validations:[],
            sx:{mt:1}
        }
    ],
    sx: { mt: 0.7, display:'flex', flexDirection:'column'},
    submit: {
        isFullWidthSubmitButton: true,
        onSubmit: (store: any) => {},
    },
}
