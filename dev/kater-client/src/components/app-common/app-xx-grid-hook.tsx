import { _, Box, DeleteForeverIcon, EditIcon, GridCellParams, IconButton, immer, SxProps, useHookstate, useTheme, useState } from '../../misc/redirect'
import { XXGridOptions } from './app-xx-grid'

function useAppXXGrid(xxGridOptions: XXGridOptions) {
    // const [columns, setColumns] = useState(xxGridOptions.columns)
    // const columns = useHookstate(xxGridOptions.columns)
    const columns = _.cloneDeep(xxGridOptions.columns)
    const theme = useTheme()
    injectStyles()
    insertDeleteColumn()
    insertEditColumn()

    function insertDeleteColumn() {
        if (xxGridOptions.deleteMethod) {
            const deleteColumn = {
                headerName: 'D',
                description: 'Delete forever',
                disableColumnMenu: true,
                disableExport: true,
                disableReorder: true,
                filterable: false,
                hideSortIcons: true,
                resizable: false,
                width: 20,
                field: '2',
                renderCell: (params: GridCellParams) => {
                    return (
                        <IconButton
                            size="small"
                            color="error"
                            className="delete"
                            // disabled={!!xxGridOptions.isDeleteDisabled}
                            onClick={() =>
                                (xxGridOptions.deleteMethod ? xxGridOptions.deleteMethod(params) : null)
                            }
                            aria-label="Delete">
                            <DeleteForeverIcon />
                        </IconButton>
                    )
                },
            }
            columns.unshift(deleteColumn)
        }
    }

    function insertEditColumn() {
        if (xxGridOptions.editMethod) {
            const editColumn = {
                headerName: 'E',
                description: 'Edit',
                disableColumnMenu: true,
                disableExport: true,
                disablePrint: true,
                disableReorder: true,
                filterable: false,
                hideSortIcons: true,
                resizable: false,
                width: 20,
                field: '1',
                renderCell: (params: GridCellParams) => {
                    return (
                        <Box>
                            <IconButton
                                size="small"
                                color="secondary"
                                // disabled={options.isEditDisabled}
                                onClick={() => (xxGridOptions.editMethod ? xxGridOptions.editMethod(params) : null)}
                                aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                        </Box>
                    )
                },
            }
            // setColumns((old: any[]) => {
            //     old.unshift(editColumn)
            //     return [...old]
            // })
            // setColumns(immer((draft:any)=>{
            //     draft.unshift(editColumn)
            //     return(draft)
            // }))
            columns.unshift(editColumn)
        }
    }

    function injectStyles() {
        for (const column of columns) {
            column.headerClassName = 'header-style'
        }
    }

    const sxStyles: SxProps = {
        '& .header-style': {
            color: theme.palette.secondary.main,
            fontWeight: 'bolder',
        },
    }

    return { columns, sxStyles }
}
export { useAppXXGrid }
