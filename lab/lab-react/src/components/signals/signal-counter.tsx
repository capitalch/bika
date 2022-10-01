import { signal } from '@preact/signals-react'
import produce from 'immer'
import { store } from '../../store/global-store'


function SignalCounter() {
    return (<div>
        <span><b>Signals counter</b></span>
        <br></br>
        <span>{store.count}</span>
        <br></br>
        <button onClick={() => {
            store.count.value++
        }}>Add</button>
        <store.currentComponent.value />
        <button onClick={toggleComponent}>Toggle</button>
        <div>{store.arr.value.length}</div>
        <SignalInc />
    </div>)

    function toggleComponent() {
        store.currentComponent.value = BComponent
    }
}

export { SignalCounter }

function SignalInc() {
    return (<button onClick={() => {
        store.count.value++
    }}>
        Add from other component
    </button>)
}
export { SignalInc }

function AComponent() {
    return (<div>A Component</div>)
}

function BComponent() {
    return (<div>
        <span>B component</span>
        <button onClick={()=>{
            store.arr.value = produce(store.arr.value, (draft:any)=>{
                draft.push({})
            })
            store.arr.value.push({})
            console.log(store.arr.value)
        }}>Increase arr</button>
    </div>)
}

export { AComponent, BComponent }

