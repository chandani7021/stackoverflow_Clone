import React, { useEffect, useState } from 'react';


const UserInfoComponent = () => {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      // Dynamically load the platform.js library
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.6/platform.min.js';
      script.async = true;
      script.onload = () => {
        // Once the script has loaded, access the platform object
        const platform = window.platform;
  
        // Function to send user information to the server
        const sendUserInfoToServer = async (userInformation) => {
          try { 
            const response = await fetch('https://stackoverflow-server-z13s.onrender.com/userInfo/user-info', { //Change this link to render wala
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userInformation),
            });
  
            if (response.ok) {
              const data = await response.json();
              console.log(data.message);
  
              // Set the user data in the state
              setUserData(userInformation);
            } else {
              console.error('Failed to send user information to the server');
            }
          } catch (error) {
            console.error('Error sending user information:', error);
          }
        };
  
        // Collect user information using platform.js
        const browser = platform.name;
        const version = platform.version;
        const layout = platform.layout;
        const os = JSON.stringify(platform.os);
        const description = platform.description;
  
        // Fetch user IP address using a public API (replace with your preferred IP service)
        fetch('https://api64.ipify.org?format=json')
          .then((response) => response.json())
          .then((data) => {
            const ipAddress = data.ip;
  
            // Create an object with user information
            const userInformation = {
              browser,
              version,
              layout,
              os,
              description,
              ipAddress,
            };
  
            // Send user information to the server
            sendUserInfoToServer(userInformation);
          })
          .catch((error) => {
            console.error('Error fetching IP address:', error);
          });
      };
  
      // Append the script tag to the document to load platform.js
      document.body.appendChild(script);
  
    }, []);
  
    return (
      <div>
        {userData ? (
          <div>
            <h4>Your User Information</h4>
            <p><u>Browser: </u> {userData.browser}</p>
            <p><u>Version: </u> {userData.version}</p>
            <p><u>Layout: </u> {userData.layout}</p>
            <p><u>OS: </u> {JSON.parse(userData.os).family} {JSON.parse(userData.os).version}</p>
            <p><u>Description: </u> {userData.description}</p>
            <p><u>IP Address: </u> {userData.ipAddress}</p>
          </div>
        ) : (
          <p>Collecting user information...</p>
        )}
      </div>
    );
  };
  
  export default UserInfoComponent;