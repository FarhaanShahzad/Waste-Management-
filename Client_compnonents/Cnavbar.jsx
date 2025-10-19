import { MagnifyingGlassIcon } from '@heroicons/react/24/solid' // (optional if you want to use this later)
import { MapPinIcon } from '@heroicons/react/24/solid'

const Cnavbar = () => {
  return (
    <div className="p-4">
      {/* Location Input Field with Icon */}
      <div className="relative w-full max-w-md">
        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        
        <input 
          type="text" 
          placeholder="Enter pickup location" 
          className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Waste Type Sections */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center space-x-2 text-green-600 font-semibold">
          <span>♻️</span>
          <span>Dry Waste</span>
        </div>
        <div className="flex items-center space-x-2 text-blue-600 font-semibold">
          <span>💧</span>
          <span>Wet Waste</span>
        </div>
        <div className="flex items-center space-x-2 text-red-600 font-semibold">
          <span>☣️</span>
          <span>Hazardous Waste</span>
        </div>
      </div>
    </div>
  )
}

export default Cnavbar
