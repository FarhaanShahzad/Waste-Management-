import { useState } from 'react'
import './App.css'
import 'leaflet/dist/leaflet.css'

// import Cnavbar from '../Client_compnonents/Cnavbar'
import HomePage from '../Client_compnonents/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HomePage/>
    </>
  )
}

export default App
