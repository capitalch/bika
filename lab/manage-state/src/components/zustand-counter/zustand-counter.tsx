import { useZustandCounter1, useZustandCounter } from "./zustand-counter-hook"

function ZustandCounter() {
    // const { add, minus, state } = useZustandCounter()
    const state = useZustandCounter1((state:any)=>state)
    const add = state.add // useZustandCounter((state:any)=>state.add)
    const minus = state.minus // useZustandCounter((state:any)=>state.minus)
    
    return (<div style={{ margin: '10px' }}>
        <div>Zustand counter</div>
        <div>{state.count}</div>
        <button onClick={add}>Add</button>
        <button onClick={minus}>Minus</button>
    </div>)
}

export { ZustandCounter }