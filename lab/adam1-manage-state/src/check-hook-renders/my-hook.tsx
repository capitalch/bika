import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"
import { atomicMethods } from "./atomic-methods"

function useHook() {
    const [, setRefresh] = useState({})
    const dummy = { name: 'abcd' }
    const setAtomicMethods = useSetRecoilState(atomicMethods)

    useEffect(() => {
        // setAtomicMethods((old: any) => ({
        //     ...old,
        //     'hook:refresh': doRefresh
        // }))
        setAtomicMethods({'hook:refresh': doRefresh})
        // setAtomicMethods({'hook:xyz':doNothing})
    }, [])

    return ({ dummy })

    function doRefresh() {
        setRefresh({})
    }

    function doNothing(){

    }
}
export { useHook }