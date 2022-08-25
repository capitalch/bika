import { useBasicCounter } from "./basic-counter-hook"

function BasicCounter() {

    const { add, basicState, minus }: any = useBasicCounter()
    return (<div style={{ margin: '10px' }}>
        <div>Basic counter</div>
        <div>{basicState.current.count}</div>
        <button onClick={add}>Add</button>
        <button onClick={minus}>Minus</button>
    </div>)
}
export { BasicCounter }