import { deepSignal } from '../common/misc/preact-deepsignal'

const superAdmin = {
    clients: {
        xxGridState: {
            rows: [],
            rowsViewLimit: '100',
            searchString: '',
        },
        form: {
            clientName: '',
            clientNameError: '',
            id: undefined,
            isEditMode: false,
            remarks: '',
            serverError: '',
            shortCode: '',
            shortCodeError: '',
            isActive: true,
        },
        resetForm: () => {
            const temp = superAdminStore.clients.form
            temp.clientName.value = ''
            temp.clientName.value = ''
            temp.clientNameError.value = ''
            temp.id.value = undefined
            temp.isEditMode.value = false
            temp.remarks.value = ''
            temp.serverError.value = ''
            temp.shortCode.value = ''
            temp.shortCodeError.value = ''
            temp.isActive.value = true
        },
    },
}

let superAdminStore: any = deepSignal(superAdmin)
function resetSuperAdminStore() {
    superAdminStore = deepSignal(superAdmin)
}
export { resetSuperAdminStore, superAdminStore }
