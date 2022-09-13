import { SuperAdminMain } from "../../../modules/authentication/super-admin/super-admin-main"
import { AppHome } from "../../../modules/catering/components/app-home"

const componentMaps: any = {
    cateringHome: <AppHome />,
    superAdminTenant: <SuperAdminMain />
}
export { componentMaps }