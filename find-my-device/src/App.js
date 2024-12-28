import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const App = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await axios.get(
        "https://<your-function-url>/getLocation",
        { params: { deviceId: "device123" } }
      );
      setLocation(response.data);
    };
    fetchLocation();
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        center={location ? { lat: location.lat, lng: location.lng } : { lat: 0, lng: 0 }}
        zoom={15}
        mapContainerStyle={{ height: "400px", width: "100%" }}
      >
        {location && <Marker position={{ lat: location.lat, lng: location.lng }} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default App;
