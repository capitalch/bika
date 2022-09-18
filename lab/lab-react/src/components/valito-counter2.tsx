import { state } from "./valtio-state";

function ValitoCounter2(){
    return(<div>
        <button onClick={()=>--state.count}>Minus</button>
    </div>)
}

export {ValitoCounter2}