import React, { useState } from 'react';
import '../YourMatches.css';
import NavBar from '../components/NavBar';
import Box from '@mui/material/Box';

const YourMatches = () => {
  const matches = [
    {
      id: 1,
      name: 'John Doe - TEST',
      gender: 'Male',
      availability: 'Monday Mornings',
      supportType: 'Flexible',
      favGym: "BFit",
      picture: 'https://via.placeholder.com/150',
      contactInfo: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      gender: 'Female',
      availability: 'Tuesday Evenings',
      supportType: 'Supportive',
      favGym: 'Wooden',
      picture: 'https://via.placeholder.com/150',
      contactInfo: 'jane.smith@example.com',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      gender: 'Male',
      availability: 'Wednesday Afternoons',
      supportType: 'Competitive',
      favGym: 'BFit',
      picture: 'https://via.placeholder.com/150',
      contactInfo: 'mike.johnson@example.com',
    },
    {
      id: 4,
      name: 'Emily Davis',
      gender: 'Female',
      availability: 'Saturday Evenings, Sunday Evenings',
      supportType: 'Motivational',
      favGym: 'Wooden',
      picture: 'https://via.placeholder.com/150',
      contactInfo: 'emily.davis@example.com',
    },
    {
      id: 5,
      name: 'Chris Lee',
      gender: 'Non-binary',
      availability: 'Evenings',
      supportType: 'Unsure',
      favGym: 'BFit',
      picture: 'https://via.placeholder.com/150',
      contactInfo: 'chris.lee@example.com',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAccept = () => {
    setCurrentIndex(currentIndex + 1);
    console.log("accepted")
  };

  const handleReject = () => {
    setCurrentIndex(currentIndex + 1);
    console.log("rejected")
  };

  return (
    <Box><NavBar />
      <div className="your-matches">
        <header className="your-matches-header">
          <h1>Your Matches</h1>
        </header>
        <div className="match-list">
          {currentIndex < matches.length ? (
            <div className="match">
              <img src={matches[currentIndex].picture} alt={matches[currentIndex].name} className="match-picture" />
              <div className="match-details">
                <h2>{matches[currentIndex].name}</h2>
                <p><strong>Gender:</strong> {matches[currentIndex].gender}</p>
                <p><strong>Availability:</strong> {matches[currentIndex].availability}</p>
                <p><strong>Support Type:</strong> {matches[currentIndex].supportType}</p>
                <p><strong>Favorite Gym:</strong> {matches[currentIndex].favGym}</p>
                <p><strong>Contact Info:</strong> {matches[currentIndex].contactInfo}</p>
              </div>
              <div className="match-actions">
                <button className="accept-button" onClick={handleAccept}>Accept</button>
                <button className="reject-button" onClick={handleReject}>Reject</button>
              </div>
            </div>
          ) : (
            <div className="no-more-matches">
              <h2>No more matches available.</h2>
            </div>
          )}
        </div>
      </div>
    </Box >
  );
};

export default YourMatches;