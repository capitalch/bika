import { useZustandCounter } from "./zustand-counter-hook"

function ZustandCounter() {
    // const { add, minus, getState } = useZustandCounter()
    const count = useZustandCounter((state:any)=>state.count)
    const add = useZustandCounter((state:any)=>state.add)
    const minus = useZustandCounter((state:any)=>state.minus)
    // const { add, basicState, minus }: any = useBasicCounter()
    return (<div style={{ margin: '10px' }}>
        <div>Zustand counter</div>
        <div>{count}</div>
        <button onClick={add}>Add</button>
        <button onClick={minus}>Minus</button>
    </div>)
}

export { ZustandCounter }