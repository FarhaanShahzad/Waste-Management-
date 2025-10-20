// src/components/RequestCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  default: 'bg-gray-100 text-gray-800'
};

const priorityStyles = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

const RequestCard = ({ request }) => {
  const statusClass = statusStyles[request.status] || statusStyles.default;
  const priorityClass = priorityStyles[request.priority] || 'bg-gray-100 text-gray-800';

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <Link to={`/admin/requests/${request.id}`} className="text-green-600 hover:text-green-800">
          {request.id}
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
        {request.type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {request.location}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
          {request.status.replace('-', ' ')}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(request.date).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Link
            to={`/admin/requests/${request.id}`}
            className="text-blue-600 hover:text-blue-900 p-1"
            title="View Details"
          >
            <FiEye className="w-5 h-5" />
          </Link>
          <Link
            to={`/admin/requests/${request.id}/edit`}
            className="text-yellow-600 hover:text-yellow-900 p-1"
            title="Edit"
          >
            <FiEdit2 className="w-5 h-5" />
          </Link>
          <button
            className="text-red-600 hover:text-red-900 p-1"
            title="Delete"
            onClick={(e) => {
              e.preventDefault();
              // Handle delete
            }}
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RequestCard;