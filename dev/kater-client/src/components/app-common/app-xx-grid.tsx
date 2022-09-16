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
            disableSelectionOnClick={true}
            rows={xxGridOptions.sharedXXGridHookstate.rows.get()}
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
    addMethod?: () => void
    deleteMethod?: (args: any) => void
    editMethod?: (args: any) => void
    fetchData: () => void
    printPreviewMethod?: (args: any) => void

    isToolbarColumnsButton?: boolean
    isToolbarExportButton?: boolean
    isToolbarFilterButton?: boolean

    isCheckBoxSelection?: boolean
    isEditDisabled?: boolean
    isDeleteDisabled?: boolean
    isPrintPreviewDisabled?: boolean
    toShowViewLimit?: boolean
    // rows: any[]
    sharedXXGridHookstate: any
    subTitle?: string
    title?: string
}
export { type XXGridOptions }
