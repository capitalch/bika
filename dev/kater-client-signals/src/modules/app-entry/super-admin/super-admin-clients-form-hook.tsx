import { appGraphqlStrings, closeDialog, emit, globalValidators, ibukiMessages, showSuccessMessage, SqlObject, SxProps, useAppGraphql, useSnapshot, useTheme } from '../../../common/misc/redirect'
import { superAdminStore } from '../../../stores/super-admin-store'
function useSuperAdminClientsForm() {
    const theme = useTheme()
    const { mutateGraphql } = useAppGraphql()
    const clientForm = superAdminStore.clients.form
    const { checkNoSpaceOrSpecialChar, checkRequired, } = globalValidators()

    function checkErrors() {

        function checkShortCode(value: string) {
            clientForm.shortCodeError.value = checkRequired(value) || checkNoSpaceOrSpecialChar(value)
            return (clientForm.shortCodeError.value)
        }

        function checkClientName(value: string) {
            clientForm.clientNameError.value = checkRequired(value)
            return (clientForm.clientNameError.value)
        }

        function checkAllErrors() {
            return (checkClientName(clientForm.clientName.value) || checkShortCode(clientForm.shortCode.value))
        }

        return ({ checkAllErrors, checkClientName, checkShortCode })
    }

    function onCancel() {
        superAdminStore.clients.resetForm()
        closeDialog()
    }

    async function onSubmit() {
        const err = checkErrors().checkAllErrors()
        if (!err) {
            const sqlObject: SqlObject = {
                tableName: 'ClientM',
                generateId: clientForm.id.value ? false : true,
                idGeneratorTableName: 'IdGeneratorTable',
                xData: {
                    id: clientForm.id.value,
                    clientName: clientForm.clientName.value,
                    remarks: clientForm.remarks.value,
                    shortCode: clientForm.shortCode.value,
                    isActive: clientForm.isActive.value,
                }
            }
            if(!clientForm.isEditMode.value){
                sqlObject.xData.dbName = sqlObject.xData.shortCode.concat('_db')
            }
            
            const q = appGraphqlStrings.genericUpdate(sqlObject)

            const ret = await mutateGraphql(q)
            console.log(ret)
            showSuccessMessage()
            emit(ibukiMessages.superAdminClientsXXGridFetchData,'')
            superAdminStore.clients.resetForm()
            closeDialog()
        }
    }

    function getSxStyles(): SxProps {
        return {
            display: 'flex',
            flexDirection: 'column',
            width: theme.spacing(40),
            '& .input': {
                mt: 2,
                width: '100%',
                color: theme.palette.primary.main,
            },
            '& .cancel-submit': {
                display: 'flex',
                justifyContent: 'space-between'
            },
            '& .button': {
                width: '48%',
                mt: 1,
            },
            '& .server-error': {
                mt: 1
            }

        }
    }

    return { checkErrors, getSxStyles, onCancel, onSubmit }
}
export { useSuperAdminClientsForm }
