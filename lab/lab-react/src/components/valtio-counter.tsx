import { state } from "./valtio-state"
import { proxy, useSnapshot } from 'valtio'


function ValtioCounter() {
    const snap: any = useSnapshot(state)
    return (<div>
        <span> Count: </span>
        <span>{state.count}</span>
        <br />
        <button onClick={() => {
            ++state.count
        }}>Add</button>
    </div>)
}
export { ValtioCounter }

function ValitoCounterReader(){
    const snap: any = useSnapshot(state)
    return(<div>
        <span>{snap.count}</span>
    </div>)
}
export{ValitoCounterReader}