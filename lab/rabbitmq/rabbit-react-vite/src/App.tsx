import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { RabbitConnectAmpq } from './rabbit-connect-ampq'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RabbitConnectAmpq />
        
    </div>
  )
}

export default App
