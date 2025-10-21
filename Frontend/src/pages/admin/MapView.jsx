import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FiInfo, FiClock, FiMapPin, FiFilter, FiX } from 'react-icons/fi';
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

// Store coordinates outside the component to persist between renders
const requestCoordinates = {};

const MapView = () => {
  const { requests, loading, updateRequestStatus } = useAdmin();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [mapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom] = useState(DEFAULT_ZOOM);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const mapRef = useRef();

  // Generate consistent coordinates for each request
  const getRequestCoordinates = (requestId) => {
    if (!requestCoordinates[requestId]) {
      const lat = DEFAULT_CENTER[0] + (Math.random() * 0.02 - 0.01);
      const lng = DEFAULT_CENTER[1] + (Math.random() * 0.02 - 0.01);
      requestCoordinates[requestId] = [lat, lng];
    }
    return requestCoordinates[requestId];
  };

  // Filter requests based on selected status
  const filteredRequests = selectedStatus === 'all' 
    ? requests 
    : requests.filter(req => req.status === selectedStatus);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await updateRequestStatus(requestId, newStatus);
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
    <div className="h-full flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow">
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

      <div className="flex-1 rounded-lg overflow-hidden border border-gray-200 bg-white">
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
          
          {filteredRequests.map((request) => (
            <Marker
              key={request.id}
              position={getRequestCoordinates(request.id)}
              icon={markerIcons[request.status] || markerIcons.pending}
              eventHandlers={{
                click: () => setSelectedRequest(request),
              }}
            >
              <Popup>
                <div className="space-y-2 min-w-[200px]">
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
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Selected Request Sidebar */}
      {selectedRequest && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 p-4 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium">Request #{selectedRequest.id}</h3>
            <button
              onClick={() => setSelectedRequest(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Location</h4>
              <p className="mt-1 flex items-center">
                <FiMapPin className="mr-2" />
                {selectedRequest.location}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Date</h4>
              <p className="mt-1 flex items-center">
                <FiClock className="mr-2" />
                {new Date(selectedRequest.date).toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
              <StatusDropdown
                value={selectedRequest.status}
                onChange={(status) => {
                  handleStatusChange(selectedRequest.id, status);
                  setSelectedRequest({...selectedRequest, status});
                }}
                className="w-full"
              />
            </div>
            {selectedRequest.notes && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                <p className="mt-1 text-sm text-gray-700">{selectedRequest.notes}</p>
              </div>
            )}
            <Button
              variant="primary"
              className="w-full mt-4"
              onClick={() => {
                window.location.href = `/admin/requests/${selectedRequest.id}`;
              }}
            >
              View Full Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;