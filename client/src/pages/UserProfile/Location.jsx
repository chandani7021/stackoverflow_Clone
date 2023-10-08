import React, { useState } from 'react'
import './UserProfile.css'
import LocationTracker from './LocationTraker'
import { GOOGLE_MAPS_API_KEY } from '../../configure';


const Location = () => {
    const[latitude, setLatitude] = useState(' ');
    const[longitude,setLongitude] = useState(' ');
    const [userAddress, setUserAddress] = useState('');
    const [fetchingData, setFetchingData] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const getLocation = () => {
        if (navigator.geolocation) {
          // Set the fetching data flag to true
          setFetchingData(true);
    
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
    
              // Fetch user address after obtaining coordinates
              fetchUserAddress(position.coords.latitude, position.coords.longitude);
            
               // Set the buttonClicked flag to true
              setButtonClicked(true);
    
            
            },
            handleLocationError
          );
        } else {
          alert("GeoLocation is not supported by this browser.");
        }
      }
    
      const handleLocationError = (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Denied request for geolocation");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable");
            break;
          case error.TIMEOUT:
            alert("Request to get user location timed out");
            break;
          case error.UNKNOWN_ERROR:
            alert("Unknown error occurred");
            break;
          default:
            alert("Unknown error occurred");
            break;
        }
      }
    
      const fetchUserAddress = (lat, lng) => {
        // Use Google Maps Geocoding API to fetch the address
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.results && data.results.length > 0) {
              const address = data.results[0].formatted_address;
              setUserAddress(address);
            } else {
              setUserAddress('');
            }
          })
          .catch((error) => {
            console.error('Error fetching address:', error);
            setUserAddress('Error fetching address');
          })
          .finally(() => {
            // Set the fetching data flag back to false
            setFetchingData(false);
          });
      }


  return (
    <div className='geo-location'>
        <h2>Geo Location</h2>
        
        <ul style={{listStyleType: 'none'}}>
            <li><button onClick={getLocation} disabled={fetchingData || buttonClicked}>
            {fetchingData ? 'Fetching Coordinates and Address...' : 'Get Coords'}
                </button></li>
                {buttonClicked && (
                <>
                <li>Latitude: {latitude} </li>
                <li>Longitude: {longitude}</li>
                {userAddress && <li>{userAddress}</li>}
                {latitude && longitude &&<LocationTracker />}
            </>
        )}
        </ul>
    </div>
  )
}

export default Location



//To enable Google API key
// https://console.cloud.google.com/apis/credentials?project=stackoverflow-396716

// make config.js make google api key and add that in config.