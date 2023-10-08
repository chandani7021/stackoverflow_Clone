import React, { useEffect, useState } from 'react';

const UserHistoryComponent = () => {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch user history data from the server
    fetch('https://stackoverflow-server-z13s.onrender.com/userInfo/history')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.userHistory && data.userHistory.length > 0) {
            // Set only the most recent history item
            setUserHistory([data.userHistory[0]]);
          }
          setLoading(false); // Set loading to false after data is fetched
        })
      .catch((error) => {
        console.error('Error fetching user history:', error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  return (
    <div>
      <h2>User History</h2>
      {loading ? ( // Show loading message while data is being fetched
        <p>Loading user history...</p>
      ) : userHistory.length > 0 ? (
        <ul>
          {userHistory.map((historyItem, index) => (
            <li key={index}>
              <p><u>Browser: </u>{historyItem.browser}</p>
              <p><u>Version: </u>{historyItem.version}</p>
              <p><u>Layout: </u>{historyItem.layout}</p>
              <p><u>OS: </u> {JSON.parse(historyItem.os).family} {JSON.parse(historyItem.os).version}</p>
              <p><u>Description: </u> {historyItem.description}</p>
              <p><u>IP Address: </u>{historyItem.ipAddress}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
};

export default UserHistoryComponent;