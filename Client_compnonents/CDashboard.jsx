import React from 'react'
import { Profile_photo } from '../material'

const CDashboard = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={Profile_photo}
          alt="User-Photo"
          className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">UserName</h2>
        <h3 className="text-gray-600">Address</h3>
      </div>

      {/* Spacer pushes logout to the bottom */}
      <div className="flex-grow" />

      {/* Logout Section */}
      <div className="flex justify-center">
        <button
          className="text-red-600 hover:text-red-800 font-medium underline"
          onClick={() => alert('Logged out')}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default CDashboard
