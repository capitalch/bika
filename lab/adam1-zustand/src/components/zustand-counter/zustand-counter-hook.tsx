import { useState } from 'react'
import create from 'zustand'

const useZustandCounter1: any = create((set: any) => ({
    count: 1,
    add: () => set((state: any) => ({ count: state.count + 1 })),
    minus: () => set((state: any) => ({ ...state, count: state.count - 1 }))
}))

function useZustandCounter(){
    const createCounter = create((set: any) => ({
        count: 1,
        add: () => set((state: any) => ({ count: state.count + 1 })),
        minus: () => set((state: any) => ({ ...state, count: state.count - 1 }))
    }))
    const state = createCounter((state1:any)=>state1)
    const add = state.add // useZustandCounter((state:any)=>state.add)
    const minus = state.minus // useZustandCounter((state:any)=>state.minus)
    return({state, add, minus})
}

export { useZustandCounter1, useZustandCounter }