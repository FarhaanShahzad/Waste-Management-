import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Cnavbar from './Cnavbar'

const Home = () => {
  return (
    <div className="h-screen flex flex-col"> {/* Full screen height, column layout */}
      
      {/* Map - 70% height */}
      <div className="flex-grow-[7]"> 
        <MapContainer 
          center={[22.5726, 88.3639]} 
          zoom={13} 
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>

      {/* Cnavbar - 30% height */}
      <div className="flex-grow-[3] overflow-auto bg-gray-100">
        <Cnavbar />
      </div>

    </div>
  )
}

export default Home
