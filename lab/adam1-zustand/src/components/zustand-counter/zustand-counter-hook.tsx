import { useState } from 'react'
import create from 'zustand'

const useZustandCounter: any = create((set: any) => ({
    count: 1,
    add: () => set((state: any) => ({ count: state.count + 1 })),
    minus: () => set((state: any) => ({ ...state, count: state.count - 1 }))
}))

// function useZustandCounter(set:any) {
// const [, setRefresh] = useState({})
// return create((set) => ({
//     count: 0
// }))
// const zustandState = create((set: any) => ({
//     count: 1
// }))
// // const state = zState()
// function add(){
//     getState().count++
//     setRefresh({})
// }
// function minus(){
//     getState().count--
//     setRefresh({})
// }
// return ({add, getState, minus })
// }
export { useZustandCounter }