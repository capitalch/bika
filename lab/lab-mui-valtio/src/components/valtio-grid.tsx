import { DataGridPro } from '@mui/x-data-grid-pro'
import { proxy, useSnapshot } from 'valtio'
import { useEffect } from 'react'
import produce from 'immer'
const state: { rows: any[any] } = proxy({
    rows: [
        {
            id: 1,
            clientName: 'aaakkk',
        },
        {
            id: 2,
            clientName: 'aaakkk',
        },
    ],
})

function ValtioGrid() {
    const snap = useSnapshot(state)

    useEffect(() => {
        // state.rows = []
        state.rows =
            // [...state.rows, {
            //     id: 2,
            //     clientName: 'aaakkk1',
            // },]

            produce(state.rows, (draft: any) => {
                draft.push({
                    id: 2,
                    clientName: 'aaakkk',
                })
                draft.pop()
            })
        // state.rows = [{
        // id: 2,
        // clientName: 'baaa'

        // },
        // {
        //     id: 3,
        //     clientName: 'baaa'

        // },
        // {
        //     id: 1,
        //     clientName: 'baaa'

        // },]
        // state.rows.pop()
        // state.rows.push(
        //     {
        //         id: 1,
        //         clientName: 'aaakkk'
        //     }
        // )
    }, [])

    return (
        <DataGridPro
            autoHeight={true}
            checkboxSelection={true}
            columns={getColumns()}
            density="compact"
            disableColumnMenu={true}
            disableSelectionOnClick={true}
            rows={state.rows}
            showCellRightBorder={true}
            showColumnRightBorder={true}
        />
    )

    function getColumns() {
        return [
            {
                headerName: '#',
                width: 60,
                field: 'id',
            },
            {
                headerName: 'Name',
                width: 160,
                field: 'clientName',
                headerClassName: 'header-class',
            },
        ]
    }
}
export { ValtioGrid }
