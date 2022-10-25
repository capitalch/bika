import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { WSConnect } from './ws-connect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <WSConnect />
        
    </div>
  )
}

export default App
