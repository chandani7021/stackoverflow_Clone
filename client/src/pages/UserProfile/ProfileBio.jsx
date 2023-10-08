import React, { useState,useEffect } from 'react'
import Location from './Location'
import UserInfoComponent from './UserInfo.jsx';
import UserHistoryComponent from './UserHis.jsx';

import './UserProfile.css'


const ProfileBio = ({ currentProfile}) => {
    
    const [points, setPoints] = useState(0);
    const [badges, setBadges] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    console.log('currentProfile:', currentProfile);
    


    useEffect(() => {
        // Fetch user points and badges from the server
        const fetchPointsAndBadges = async () => {
          try {
            const profileData = JSON.parse(localStorage.getItem('Profile'));
    
            if (!profileData) {
              console.error('Profile data not found in local storage');
              return;
            }
            // const response = await fetch('http://localhost:5000/answer/points', {
    
            const response = await fetch('https://stackoverflow-server-z13s.onrender.com/answer/points', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ profileData }),
            });
    
            const data = await response.json();
    
            // Update the points and badges in the state
            setPoints(data.points);
            setBadges(data.badges);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Call the fetchPointsAndBadges function when the component mounts
        fetchPointsAndBadges();
      }, []);
    
    return (
        <div>
           
            <div>
                {
                    currentProfile?.tags.length !==0 ? (
                        <>
                            <h4>Tags Watched</h4>
                            {
                                currentProfile?.tags.map((tag) => (
                                    <p key={tag}> { tag }</p>
                                ))
                            }
                        </>
                    ):(
                    <p>0 tags watched</p> 
                    )
                }
            </div>
            <div>
                {
                    currentProfile?.about ? (
                        <>
                        <h4>About</h4>
                        <p>{ currentProfile?.about}</p>  
                        </>
                    ) : (
                        <p>No bio found</p>
                    )
                }

            </div>
            <h4>Achievements</h4>
                <div>Points: {points}</div>
                <div>
                    {badges?.length > 0 ? (
                    <>
                        Badges: {badges.join(', ')}
                    </>
                    ) : (
                    <p>No badges earned</p>
                    )}
                </div>
            {/* <RewardButton userId={currentProfile?.userId} /> */}
            <div>
                <UserInfoComponent />

                {/* Button to toggle user history visibility */}
                <button style={{display:'block'}} onClick={() => setShowHistory(!showHistory)}>
                    {showHistory ? 'Hide History' : 'Show History'}
                </button>

                {/* Display UserHistoryComponent if showHistory is true */}
                {showHistory && <UserHistoryComponent />}
            </div>
          
            <Location />
          



        </div>
    )
}

export default ProfileBio