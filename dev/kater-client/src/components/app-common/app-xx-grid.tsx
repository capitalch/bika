import { GridToolbar } from '@mui/x-data-grid-pro'
import _ from 'lodash'
import { Box, DataGridPro, useEffect, useTheme } from '../../misc/redirect'
import { useAppXXGrid } from './app-xx-grid-hook'

function AppXXGrid(xxGridOptions: XXGridOptions) {
    const { columns, CustomGridToolbar, sxStyles } = useAppXXGrid(xxGridOptions)

    return (
        <DataGridPro
            autoHeight={true}
            checkboxSelection={xxGridOptions.isCheckBoxSelection ? true : false}
            columns={columns}
            density="compact"
            disableColumnMenu={true}
            rows={xxGridOptions.rows}
            showCellRightBorder={true}
            showColumnRightBorder={true}
            sx={sxStyles}
            components={{
                Toolbar: CustomGridToolbar,
            }}
        />
    )
}
export { AppXXGrid }

interface XXGridOptions {
    columns: any[]
    deleteMethod?: (args: any) => void
    editMethod?: (args: any) => void
    printPreviewMethod?: (args: any) => void
    isCheckBoxSelection?: boolean
    isEditDisabled?: boolean
    isDeleteDisabled?: boolean
    isPrintPreviewDisabled?: boolean
    rows: any[]
    subTitle?: string
    title?: string
}
export { type XXGridOptions }
