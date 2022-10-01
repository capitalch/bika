import { signal } from '@preact/signals-react'
import produce from 'immer'
// import {produce} from 'immer'
import { useDeepSignal, deepSignal } from 'preact-signal-store'

const globalObject: any = {
    errors: signal({
        // id1: signal(''),
        // id2: signal(''),
    }),
}

const userStore: any = deepSignal({
    name: {
        first: 'Sushant',
        last: 'Agrawal',
        nesting1: {
            method: () => {
                console.log('abcd')
            },
        },
        errors: [],
    },
})

const fn = (x: any) => {
    console.log(x)
}

function SignalsNestedObject() {
    return (
        <div>
            <span>{userStore.name.first.value}</span>
            <span>{userStore.name.errors.value.toString()}</span>
            <button onClick={handleSetError}>Set error</button>
            <button onClick={handleNestedMethod}>Nested method</button>
            <button onClick={handleCallback}>Callback</button>
            <button onClick={handleError}>Handle error</button>
        </div>
    )

    function handleSetError() {
        userStore.name.first.value = 'Niraj'
        // globalObject.errors = {...globalObject.errors, ...{id1:signal('')}}
        // globalObject.errors.value.id1 = 'abcd'
    }
    function handleNestedMethod() {
        userStore.name.nesting1.method.value()
    }
    function handleCallback() {
        fn('xyz')
    }
    function handleError() {
        // userStore.name.errors.value.push('abcd')
        const arr = userStore.name.errors.value
        userStore.name.errors.value = produce(arr, (draft:any)=>{
            draft.push('abcd')
        })
    }
}
export { SignalsNestedObject }
