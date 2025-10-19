import { useState } from 'react'
import './App.css'
import 'leaflet/dist/leaflet.css'
import { Routes,Route,Link } from 'react-router-dom'
import Footer from '../Client_compnonents/footer'
import Cnavbar from '../Client_compnonents/Cnavbar'
import CDashboard from '../Client_compnonents/CDashboard'
import HomePage from '../Client_compnonents/home'
import Aboutus from '../Client_compnonents/Aboutus'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <nav>
        
<Link 
          to="/about" 
          className=" "
        >
  
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<CDashboard/>} />
        <Route path="/about" element={<Aboutus/>} />

      </Routes>
    
    </>
  )
}

export default App
