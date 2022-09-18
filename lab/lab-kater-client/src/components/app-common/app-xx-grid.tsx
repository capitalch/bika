import { GridToolbar } from '@mui/x-data-grid-pro'
import _ from 'lodash'
import { Box, DataGridPro, useEffect, useTheme } from '../../misc/redirect'
import { useAppXXGrid } from './app-xx-grid-hook'
import { proxy, useSnapshot } from 'valtio'
import { globalState } from '../../global-state/valtio-state'


function AppXXGrid(xxGridOptions: XXGridOptions) {
    const { columns, CustomGridToolbar, fetchData, fetchData1,requestSearch, sxStyles } =
        useAppXXGrid(xxGridOptions)
    const snap = useSnapshot(globalState)
    return (
        <DataGridPro
            autoHeight={true}
            checkboxSelection={xxGridOptions.isCheckBoxSelection ? true : false}
            columns={columns}
            density="compact"
            disableColumnMenu={true}
            disableSelectionOnClick={true}
            rows={snap.rows}
            showCellRightBorder={true}
            showColumnRightBorder={true}
            sx={sxStyles}
            components={{
                Toolbar: CustomGridToolbar,
            }}
            componentsProps={{
                toolbar: { xxGridOptions: xxGridOptions, fetchData: fetchData, requestSearch: requestSearch, fetchData1: fetchData1 },
            }}
        />
    )
}
export { AppXXGrid }

interface XXGridOptions {
    columns: any[]
    addMethod?: () => void
    deleteMethod?: (args: any) => void

    doRefresh?: any,

    editMethod?: (args: any) => void

    exposedMethods?:any

    fetchData?: () => void
    fetchDataIbukiMessage?: string
    
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
    sqlKey?: string
    sqlArgs?: any
    subTitle?: string
    title?: string
    xxGridState: any
}
export { type XXGridOptions }
