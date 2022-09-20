import { useState } from 'react'
import immer from 'immer'
function ObjectCounter() {
    const [objectCounter, setObjectCounter] = useState({ counter: 0 })

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'right',
            }}>
            <span>Object counter: {objectCounter.counter}</span>

            <button
                style={{
                    width: '4rem',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                }}
                onClick={handleClick}>
                Add
            </button>
        </div>
    )

    function handleClick() {
        // setObjectCounter({ counter: objectCounter.counter + 1 })
        // setObjectCounter((old: any) => {
        //     old.counter = old.counter + 1
        //     return {...old}
        // })
        // setObjectCounter({counter: 2})
        // setObjectCounter((old: any) => {
        //     return {
        //         ...old,
        //         ...{ counter: old.counter + 1 },
        //     }
        // })
        const var1 = immer(objectCounter, (draft:any)=>{
            draft.counter = draft.counter+ 1
        })
        setObjectCounter(var1)
    }
}
export { ObjectCounter }
