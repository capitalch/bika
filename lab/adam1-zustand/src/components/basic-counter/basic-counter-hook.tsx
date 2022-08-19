import { useRef, useState } from "react"

function useBasicCounter() {
    const [, setRefresh] = useState({})
    const basicState = useRef({
        count: 0
    })
    function add() {
        basicState.current.count++
        setRefresh({})
    }
    function minus(){
        basicState.current.count--
        setRefresh({})
    }

    return ({ basicState, add, minus })
}

export { useBasicCounter }