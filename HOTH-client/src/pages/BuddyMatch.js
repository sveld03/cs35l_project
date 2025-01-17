import React, { useState, useEffect } from 'react';
import '../YourMatches.css';
import NavBar from '../components/NavBar';
import Box from '@mui/material/Box';

const BuddyMatch = () => {
  const [matches, setMatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data from API
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/gymBuddy/match', {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${window.localStorage.token}`,
          },
        });
        const data = await response.json();

        // Transform API data to match the desired structure
        const transformedData = data.map((match) => ({
          id: match._id,
          name: match.name,
          gender: match.gender,
          availability: match.gymBuddy.availability
            .map((slot) => `${slot.day} ${slot.times.join(', ')}`)
            .join(', '),
          supportType: match.gymBuddy.motivationStyle || 'Not specified',
          favGym: match.gymBuddy.gymPreference,
          picture: match.profilePicture || 'https://via.placeholder.com/150',
          contactInfo: match.email,
        }));

        setMatches(transformedData);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  // Handle accept action
  const handleAccept = async () => {
    const currentMatch = matches[currentIndex];
    try {
      await fetch(`http://localhost:4000/api/gymBuddy/like/${currentMatch.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${window.localStorage.token}`,
        },
      });
      console.log('Accepted:', currentMatch.name);
    } catch (error) {
      console.error('Error accepting match:', error);
    } finally {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Handle reject action
  const handleReject = async () => {
    const currentMatch = matches[currentIndex];
    try {
      await fetch(`http://localhost:4000/api/gymBuddy/dislike/${currentMatch.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${window.localStorage.token}`,
        },
      });
      console.log('Rejected:', currentMatch.name);
    } catch (error) {
      console.error('Error rejecting match:', error);
    } finally {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <Box>
      <NavBar />
      <div className="your-matches">
        <header className="your-matches-header">
          <h1>Your Matches</h1>
        </header>
        <div className="match-list">
          {currentIndex < matches.length ? (
            <div className="match">
              <img
                src={matches[currentIndex].picture}
                alt={matches[currentIndex].name}
                className="match-picture"
              />
              <div className="match-details">
                <h2>{matches[currentIndex].name}</h2>
                <p>
                  <strong>Gender:</strong> {matches[currentIndex].gender}
                </p>
                <p>
                  <strong>Availability:</strong> {matches[currentIndex].availability}
                </p>
                <p>
                  <strong>Support Type:</strong> {matches[currentIndex].supportType}
                </p>
                <p>
                  <strong>Favorite Gym:</strong> {matches[currentIndex].favGym}
                </p>
              </div>
              <div className="match-actions">
                <button className="accept-button" onClick={handleAccept}>
                  Like
                </button>
                <button className="reject-button" onClick={handleReject}>
                  Dislike
                </button>
              </div>
            </div>
          ) : (
            <div className="no-more-matches">
              <h2>No more matches available.</h2>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default BuddyMatch;