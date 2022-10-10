import {
    appGraphqlStrings,
    Box,
    Button,
    Checkbox,
    closeDialog,
    emit,
    FormControlLabel,
    ibukiMessages,
    messages,
    showErrorMessage,
    showSuccessMessage,
    SqlObject,
    TextField,
    Typography,
    useAppGraphql,
} from '../../../common/misc/redirect'
import { JsonFormType } from '../../../react-form/interfaces'
import { ReactForm } from '../../../react-form/react-form'
import { superAdminStore } from '../../../stores/super-admin-store'
import { useSuperAdminClientsForm } from './super-admin-clients-form-hook'

function SuperAdminClientForm1() {
    const clientForm = superAdminStore.clients.form
     if(clientForm.isEditMode){
        jsonFormClient.items[0].defaultValue = clientForm.clientName.value
        jsonFormClient.items[1].defaultValue = clientForm.shortCode.value
        jsonFormClient.items[2].defaultValue = clientForm.remarks.value
        jsonFormClient.items[3].defaultValue = clientForm.isActive.value
    }
    jsonFormClient.submit.onSubmit = handleOnSubmit
    const { mutateGraphql } = useAppGraphql()
    return <ReactForm jsonForm={jsonFormClient} />

    async function handleOnSubmit(store: any) {
        const sqlObject: SqlObject = {
            tableName: 'ClientM',
            generateId: clientForm.id.value ? false : true,
            idGeneratorTableName: 'IdGeneratorTable',
            xData: {
                id: clientForm.id.value,
                clientName: store.clientName.data.value,
                remarks: store.remarks.data.value,
                shortCode: store.shortCode.data.value,
                isActive: store.isActive.data.value,
            }
        }
        if (!clientForm.isEditMode.value) {
            sqlObject.xData.dbName = store.shortCode.data.value.concat('_db')
        }
        const q = appGraphqlStrings.genericUpdate(sqlObject)
        try {
        const ret = await mutateGraphql(q)
        showSuccessMessage()
        emit(ibukiMessages.superAdminClientsXXGridFetchData, '')
        closeDialog()
        } catch(e: any){
            showErrorMessage(e.message || messages.errFetch)
        }
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
            name: 'remarks',
            label: 'Remarks',
            typeName: 'TextMaterial',
        },
        {
            name: 'isActive',
            label: 'Active',
            typeName: 'CheckBoxMaterial',
            // sx:{mt:1}
        }
    ],
    sx: {width:350, mt: 0.7, display: 'flex', flexDirection: 'column', rowGap: 2 },
    submit: {
        isFullWidthSubmitButton: true,
        onSubmit: (store: any) => { },
    },
}
