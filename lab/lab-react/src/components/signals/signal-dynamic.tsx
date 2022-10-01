import { signal } from '@preact/signals-react'
import { useEffect, useRef } from 'react'
import { dynamicStore } from './dynamic-store'

function SignalDynamic() {
    const meta: any =
        useRef({
            personName: signal(''),
            address1: signal(''),
            count: signal(0)
        })

    useEffect(() => {
        // meta.current = Object.assign({}, meta.current, {personName: signal(''),
        // address1: signal(''),
        // count: signal(0)})
        // meta.current.personName = signal('')
        // meta.current.address1 = signal('')
    }, [])

    return (<div>
        <span>Name: </span>
        <span>{meta.current?.personName?.value}</span>
        <span>Address:</span>
        <span>{meta.current?.address1?.value}</span>
        <button onClick={handleSetName}>Set Name</button>
        <button onClick={handleSetAddress}>Set address</button>
    </div>)

    function handleSetName() {
        meta.current.personName.value = meta.current.personName.value.concat('Aa')
        meta.current.address1.value = meta.current.address1.value.concat('Bb')

        // meta.personName.value = meta.personName.value.concat('Aa')
        // meta.address1.value = meta.address1.value.concat('Bb')

        // meta.current.personName =meta.current.personName.concat('Aa')
    }

    function handleSetAddress() {
        meta.current.address1.value.concat('Bb')
    }
}

export { SignalDynamic }