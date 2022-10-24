import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { SocketIOConnect } from './socketio-connect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <SocketIOConnect />
        
    </div>
  )
}

export default App
