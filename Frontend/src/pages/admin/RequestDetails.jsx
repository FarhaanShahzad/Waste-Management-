// src/pages/admin/RequestDetails.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiCalendar, FiClock, FiAlertTriangle, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { format } from 'date-fns';

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('pending');

  // Mock data - replace with actual API call
  const request = {
    id: id,
    type: 'Household Waste',
    status: 'pending',
    priority: 'high',
    location: '123 Main St, City, Country',
    description: 'Household waste collection including plastic, paper, and organic waste.',
    date: '2023-11-20T14:30:00',
    createdAt: '2023-11-15T10:30:00',
    notes: 'Please collect from the back alley. The waste is bagged and ready for pickup.',
    collector: 'John Doe',
    collectorContact: '+1 234 567 890'
  };

  const statusStyles = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: <FiAlertTriangle className="h-5 w-5" />
    },
    'in-progress': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: <FiTruck className="h-5 w-5" />
    },
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: <FiCheckCircle className="h-5 w-5" />
    }
  };

  const priorityStyles = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // TODO: Update status via API
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FiArrowLeft className="mr-2" />
          Back to Requests
        </button>
        <div className="mt-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Request Details</h1>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Edit
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Request #{request.id}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Created on {format(new Date(request.createdAt), 'MMM d, yyyy')}
            </p>
          </div>
          <div className={`${statusStyles[status]?.bg} ${statusStyles[status]?.text} px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
            {statusStyles[status]?.icon}
            <span className="ml-1.5 capitalize">{status.replace('-', ' ')}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Waste Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {request.type}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Priority</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityStyles[request.priority]}`}>
                  {request.priority}
                </span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <FiMapPin className="mr-2 text-gray-400" />
                {request.location}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Scheduled Time</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                <FiCalendar className="mr-2 text-gray-400" />
                {format(new Date(request.date), 'MMMM d, yyyy')}
                <FiClock className="ml-4 mr-2 text-gray-400" />
                {format(new Date(request.date), 'h:mm a')}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {request.description}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Additional Notes</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {request.notes || 'No additional notes provided.'}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Assigned Collector</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    {request.collector.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{request.collector}</p>
                    <p className="text-sm text-gray-500">{request.collectorContact}</p>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Update Status</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="flex flex-wrap gap-3">
            {Object.entries(statusStyles).map(([key, { bg, text }]) => (
              <button
                key={key}
                onClick={() => handleStatusChange(key)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  status === key
                    ? `${bg} ${text}`
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {key.replace('-', ' ')}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Add a note (optional)
            </label>
            <div className="mt-1">
              <textarea
                rows={3}
                name="notes"
                id="notes"
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Add any additional notes about this status update..."
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;