import { useState } from 'react'
import { hookstate, useHookstate } from '@hookstate/core'

function HookstateArray() {
    // const [arr, setArr]: any = useState([])
    const arrayGlobalState = useHookstate(arrayHookState)

    return (
        <div style={{ margin: '10px' }}>
            <div>Hookstate array count</div>
            <div>{arrayGlobalState.nested('arr').get().length}</div>
            <button onClick={add}>Add</button>
            <button onClick={minus}>Minus</button>
        </div>
    )

    function add() {
        // arrayGlobalState.set((old:any)=>{
        //     old.arr.push('b')
        //     return(old)
        // })

        arrayGlobalState.arr.set((old: any) => {
            old.push('p')
            return old
        })
    }

    function minus() {}
}

export { HookstateArray }

const arrayHookState = hookstate({
    name: '',
    arr: [''],
})
