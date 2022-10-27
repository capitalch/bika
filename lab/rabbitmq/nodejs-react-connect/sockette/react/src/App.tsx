import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { SocketteConnect } from './sockette-connect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <SocketteConnect />
        
    </div>
  )
}

export default App
