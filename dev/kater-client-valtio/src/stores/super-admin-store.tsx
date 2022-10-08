import { _, proxy } from '../common/misc/redirect'

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
            isActive: true
        },
        resetForm: () => {
            superAdminStore.clients.form.clientName = ''
            superAdminStore.clients.form.clientName = ''
            superAdminStore.clients.form.clientNameError = ''
            superAdminStore.clients.form.id = undefined
            superAdminStore.clients.form.isEditMode= false
            superAdminStore.clients.form.remarks = ''
            superAdminStore.clients.form.serverError = ''
            superAdminStore.clients.form.shortCode = ''
            superAdminStore.clients.form.shortCodeError = ''
            superAdminStore.clients.form.isActive = true
        }
    },
}

let superAdminClone = _.cloneDeep(superAdmin)
let superAdminStore = proxy(superAdminClone)

function resetSuperAdminStore() {
    superAdminClone = _.cloneDeep(superAdmin)
    superAdminStore = proxy(superAdminClone)
}

export { resetSuperAdminStore, superAdminStore, }