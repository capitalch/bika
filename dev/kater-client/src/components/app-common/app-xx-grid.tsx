import { Box } from "@mui/material"
import { DataGridPro } from '../../misc/redirect'
function AppXXGrid({
    rows,
    getColumns,
}: any) {

    return (<DataGridPro
        columns={getColumns()}
        density='compact'
        // rows={appGlobalState.superAdmin.clients.rows.get()}
        rows = {rows}
        showCellRightBorder={true}
        showColumnRightBorder={true}
        autoHeight={true}
    />)
}
export { AppXXGrid }