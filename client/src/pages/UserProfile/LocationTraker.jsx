import React, { useState, useEffect } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../configure';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const LocationTracker = () => {
  const apiKey = GOOGLE_MAPS_API_KEY; // Replace with your actual API key
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Check if the Geolocation API is available in the user's browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || { lat: 0, lng: 0 }}
        zoom={12}
        onLoad={(map) => setMap(map)}
      >
        {userLocation && <Marker position={userLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};


export default LocationTracker;
