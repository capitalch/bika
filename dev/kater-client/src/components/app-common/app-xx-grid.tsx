import _ from 'lodash'
import { Box, DataGridPro, useEffect, useTheme } from '../../misc/redirect'
import { useAppXXGrid } from './app-xx-grid-hook'

function AppXXGrid(xxGridOptions: XXGridOptions) {
    const { columns, sxStyles } = useAppXXGrid(xxGridOptions)

    return (
        <DataGridPro
            autoHeight={true}
            columns={columns}
            density="compact"
            rows={xxGridOptions.rows}
            showCellRightBorder={true}
            showColumnRightBorder={true}
            sx={sxStyles}
        />
    )
}
export { AppXXGrid }

interface XXGridOptions {
    columns: any[]
    editMethod?: (args: any) => void
    deleteMethod?: (args:any) => void
    rows: any[]
}
export { type XXGridOptions }
