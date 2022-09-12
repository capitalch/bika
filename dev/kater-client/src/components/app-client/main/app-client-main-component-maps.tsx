import { SuperAdminTenant } from "../../../modules/authentication/super-admin/super-admin-tenant"
import { AppHome } from "../../../modules/catering/components/app-home"

const componentMaps: any = {
    cateringHome: <AppHome />,
    superAdminTenant: <SuperAdminTenant />
}
export { componentMaps }