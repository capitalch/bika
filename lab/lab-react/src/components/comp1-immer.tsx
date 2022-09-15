import immer from 'immer'
function Comp1Immer() {
    const arrSwapped = swapId()
    console.log(arrSwapped)
    return <div>immer</div>

    function swapId() {
        let cnt = 0
        function inc() {
            return ++cnt
        }
        const arr2 = immer(arr1, (draft:any) => {
            for (const item of draft) {
                item.id1 = item.id
                item.id = inc()
            }
            return draft
        })
        return(arr2)
    }
}
export { Comp1Immer }
const arr1 = [
    {
        id: 3,
        headerName: '#',
        width: 60,
        field: 'id',
    },
    {
        id: 4,
        headerName: 'id',
        width: 60,
        field: 'id1',
    },
    {
        id: 6,
        headerName: 'Name',
        width: 160,
        field: 'clientName',
        headerClassName: 'header-class',
        // editable:true,
    },
    {
        id: 8,
        headerName: 'Short code',
        width: 120,
        field: 'shortCode',
    },
    {
        id: 9,
        headerName: 'Remarks',
        width: 140,
        field: 'remarks',
    },
    {
        id: 11,
        headerName: 'Database name',
        width: 120,
        field: 'dbName',
    },
    {
        id: 12,
        headerName: 'Active',
        width: 80,
        type: 'boolean',
        field: 'isActive',
    },
    {
        headerName: 'Time created',
        flex: 1,
        field: 'timestamp',
    },
]
