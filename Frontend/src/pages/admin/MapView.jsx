// src/pages/admin/MapView.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FiInfo, FiClock, FiMapPin, FiFilter } from 'react-icons/fi';
import { useAdmin } from '../../context/AdminContext';
import StatusDropdown from '../../components/StatusDropDown';
import Button from '../../components/Button';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom marker icons
const markerIcons = {
  pending: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  'in-progress': new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  completed: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  cancelled: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
};

// Default coordinates (can be set to your default location)
const DEFAULT_CENTER = [51.505, -0.09]; // London, UK
const DEFAULT_ZOOM = 13;

// Component to handle map view changes
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, map, zoom]);
  return null;
};

const MapView = () => {
  const { requests, loading, updateRequestStatus } = useAdmin();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [mapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom] = useState(DEFAULT_ZOOM);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const mapRef = useRef();

  // Filter requests based on selected status
  const filteredRequests = selectedStatus === 'all' 
    ? requests 
    : requests.filter(req => req.status === selectedStatus);

  // Generate mock coordinates for demo
  const getRequestCoordinates = (index) => {
    // This is a simple way to generate nearby coordinates for demo
    // In a real app, you would have actual coordinates from your data
    const lat = DEFAULT_CENTER[0] + (Math.random() * 0.02 - 0.01);
    const lng = DEFAULT_CENTER[1] + (Math.random() * 0.02 - 0.01);
    return [lat, lng];
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await updateRequestStatus(requestId, newStatus);
      // You might want to show a success message here
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Waste Collection Map</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Filter by status:</span>
            <StatusDropdown
              value={selectedStatus}
              onChange={setSelectedStatus}
              className="w-40"
            />
          </div>
          <Button
            variant="secondary"
            startIcon={FiFilter}
            onClick={() => setSelectedStatus('all')}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="flex-1 rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          whenCreated={mapInstance => { mapRef.current = mapInstance }}
        >
          <ChangeView center={mapCenter} zoom={mapZoom} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {filteredRequests.map((request, index) => {
            const coordinates = getRequestCoordinates(index);
            return (
              <Marker
                key={request.id}
                position={coordinates}
                icon={markerIcons[request.status] || markerIcons.pending}
                eventHandlers={{
                  click: () => {
                    setSelectedRequest(request);
                  },
                }}
              >
                <Popup>
                  <div className="space-y-2">
                    <div className="font-medium">Request #{request.id}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiMapPin className="mr-1" />
                      {request.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiClock className="mr-1" />
                      {new Date(request.date).toLocaleString()}
                    </div>
                    <div className="mt-2">
                      <StatusDropdown
                        value={request.status}
                        onChange={(status) => handleStatusChange(request.id, status)}
                        className="w-full"
                      />
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => {
                        // Navigate to request details
                        window.location.href = `/admin/requests/${request.id}`;
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Sidebar for selected request details */}
      {selectedRequest && (
        <div className="mt-4 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">Request #{selectedRequest.id}</h3>
            <button
              onClick={() => setSelectedRequest(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <FiMapPin className="mr-2" />
              {selectedRequest.location}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FiClock className="mr-2" />
              {new Date(selectedRequest.date).toLocaleString()}
            </div>
            <div className="mt-3">
              <StatusDropdown
                value={selectedRequest.status}
                onChange={(status) => handleStatusChange(selectedRequest.id, status)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;