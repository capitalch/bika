import { proxy } from 'valtio'
const globalState = proxy({

    rows: [{
        clientName: 'aaa'
        , dbName: 'aaa'
        , id: 1
        , id1: 1
        , isActive: true
        , jData: null
        , remarks: 'aa'
        , shortCode: '222'
        , timestamp: '123456'
    }],
    rowsViewLimit: '100',
    searchString: ''

})

export { globalState }