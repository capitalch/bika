import { SxProps } from '@mui/material'
import { Box, DataGridPro, useTheme } from '../../misc/redirect'
import { useAppXXGrid } from './app-xx-grid-hook'
function AppXXGrid({ rows, columns }: any) {
    const theme = useTheme()
    const { getStyledColumns, sxStyles } = useAppXXGrid()

    let cols = getStyledColumns(columns) // change headers

    return (
        <DataGridPro
            columns={cols}
            density="compact"
            rows={rows}
            showCellRightBorder={true}
            showColumnRightBorder={true}
            autoHeight={true}
            sx={sxStyles}
        />
    )
}
export { AppXXGrid }
