import { useState, useEffect } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { Routes, Route, Link } from "react-router-dom";
import Footer from "../Client_compnonents/footer";
import Cnavbar from "../Client_compnonents/Cnavbar";
import CDashboard from "../Client_compnonents/CDashboard";
import HomePage from "../Client_compnonents/home";
import Aboutus from "../Client_compnonents/Aboutus";
import Map from "../Client_compnonents/Map"; // Import the new Map component

function App() {
  const [locationCoordinates, setLocationCoordinates] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = (location) => {
    setSearchLocation(location);
  };

  useEffect(() => {
    if (searchLocation) {
      const geocodeAddress = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              searchLocation
            )}`
          );
          const data = await response.json();
          if (data && data.length > 0) {
            setLocationCoordinates([
              parseFloat(data[0].lat),
              parseFloat(data[0].lon),
            ]);
          } else {
            console.error("Location not found");
            setLocationCoordinates(null);
          }
        } catch (error) {
          console.error("Error geocoding the location:", error);
          setLocationCoordinates(null);
        }
      };
      geocodeAddress();
    }
  }, [searchLocation]);

  return (
    <>
      <nav>
        <Link to="/about" className=""></Link>
      </nav>
      <Cnavbar onSearch={handleSearch} />
      <div className="p-4">
        <Map position={locationCoordinates} />{" "}
        {/* Pass locationCoordinates to the Map component */}
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<CDashboard />} />
        <Route path="/about" element={<Aboutus />} />
      </Routes>
    </>
  );
          {/* Pass locationCoordinates to the Map component */}

}

export default App;
