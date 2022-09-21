import { produce } from 'immer'
import { useState } from 'react'
function ImmerUnderstand() {
    const initProps = {
        firstName: 'Sush',
        lastName: 'Agr',
        id: 1,
    }
    const [props, setProps] = useState(initProps)

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
                <span>{props.firstName}</span>
                <span>{props.lastName}</span>
            </div>
            <div>
                <button onClick={handleClick1}>Change1</button>
                <button onClick={handleClick2}>Change2</button>
                <button onClick={handleClick3}>Change2</button>
            </div>
        </div>
    )

    function handleClick1() {
        changeProp('firstName', 'Prash')
    }

    function handleClick2() {
        changeProp('lastName', 'Goel')
    }

    function handleClick3() {
        changeProps({
            firstName: 'Niraj',
            lastName: 'Tenany'
        })
    }

    function changeProp(propName: string, propValue: any) {
        const newProps = produce(props, (draft: any) => {
            draft[propName] = propValue
        })
        setProps(newProps)
    }

    function changeProps(changes: any){
        const newProps = produce(props, (draft:any)=>{
            for(const change in changes ){
                draft[change] = changes[change]
            }
        })
        setProps(newProps)
    }
}
export { ImmerUnderstand }
