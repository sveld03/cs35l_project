import '../YourMatches.css';
import NavBar from '../components/NavBar';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const YourBuddies = () => {
  const theme = useTheme();
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBuddies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/api/gymBuddy/getMyBuddies', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch mutual likes');
        }

        const data = await response.json();
        setBuddies(data.matches || []);
        console.log(buddies);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching buddies:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBuddies();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <NavBar />
      <div className="your-matches">
        <header className="your-matches-header">
          <h1>Your Gym Buddies</h1>
        </header>
        <div className="match-list">
          {buddies.length === 0 ? (
            <div className="no-more-matches">
              <h2>No matches yet; keep liking to find a buddy!</h2>
            </div>
          ) : (
            buddies.map((buddy, index) => (
              <div key={buddy._id} className="match">
                <div className="match-details">
                  <h2>{buddy.name}</h2>
                  <p>
                    <strong>Fitness Goal:</strong> {buddy.goal}
                  </p>
                  <p>
                    <strong>Motivation Style:</strong> {buddy.motivationStyle}
                  </p>
                  <p>
                    <strong>Favorite Gym:</strong> {buddy.gymPreference}
                  </p>
                  <p>
                    <strong>Contact Info:</strong> {buddy.email}
                  </p>
                </div>
                <div className="match-actions">
                  <button
                    className="contact-button"
                    onClick={() => window.open(`mailto:${buddy.email}`)}
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Box>
  );
};

export default YourBuddies;
