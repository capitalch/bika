import { useState } from 'react'

function ReactBasicArrayState() {
    const [arr, setArr]: any = useState([])

    return (
        <div style={{ margin: '10px' }}>
            <div>React Basic array count</div>
            <div>{arr.length}</div>
            <button onClick={add}>Add</button>
            <button onClick={minus}>Minus</button>
        </div>
    )

    function add() {
        arr.push('a')
        setArr([...arr])
    }

    function minus() {
        
    }
}

export { ReactBasicArrayState }
