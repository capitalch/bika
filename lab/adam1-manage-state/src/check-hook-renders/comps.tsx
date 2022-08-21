import { useState } from "react"
import { useRecoilValue } from "recoil"
import { atomicMethods } from "./atomic-methods"
import { useHook } from "./my-hook"

function Comp1() {
    const [, setRefresh] = useState({})
    const methods:any = useRecoilValue(atomicMethods)
    const { dummy }: any = useHook()
    return (
        <div>
            <div>This is comp1</div>
            <span>{dummy.name}</span>
            <button onClick={setRefresh}>Refresh comp1</button>
            <button onClick={refreshHook}>Refresh hook</button>
        </div>
    )

    function refreshHook(){
        methods['hook:refresh']({})
    }
}
export { Comp1 }

function Comp2() {
    const { dummy }: any = useHook()
    return (
        <div>
            <div>This is comp2</div>
            <span>{dummy.name}</span>
        </div>
    )
}
export { Comp2 }

function Comp3() {
    const { dummy }: any = useHook()
    return (
        <div>
            <div>This is comp3</div>
            <span>{dummy.name}</span>
        </div>
    )
}
export { Comp3 }