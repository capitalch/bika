import { DataGridPro, } from '../../misc/redirect'
import { useXXGrid } from './xx-grid-hook'
import { XXGridToolbar } from './xx-grid-toolbar'

function XXGrid(xxGridOptions: XXGridOptions) {
    const { columns, fetchData, filteredRows,requestSearch, sxStyles } =
        useXXGrid(xxGridOptions)

    return (
        <DataGridPro
            autoHeight={true}
            checkboxSelection={xxGridOptions.isCheckBoxSelection ? true : false}
            columns={columns}
            density="compact"
            disableColumnMenu={true}
            disableSelectionOnClick={true}
            rows={filteredRows}
            showCellRightBorder={true}
            showColumnRightBorder={true}
            sx={sxStyles}
            components={{
                Toolbar: XXGridToolbar,
            }}
            componentsProps={{
                toolbar: { xxGridOptions: xxGridOptions, fetchData: fetchData, requestSearch: requestSearch, },
            }}
        />
    )
}
export { XXGrid }

interface XXGridOptions {
    columns: any[]
    addMethod?: () => void
    deleteMethod?: (args: any) => void

    doRefresh?: any,

    editMethod?: (args: any) => void

    exposedMethods?: any

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

    sqlKey?: string
    sqlArgs?: any
    subTitle?: string
    title?: string
    xxGridState: any
}
export { type XXGridOptions }
