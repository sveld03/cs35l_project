import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import NavBar from '../components/NavBar';

const BuddyMatch = () => {
    return (
        <Box>
            <NavBar />
            <Typography variant="h5" gutterBottom>
                Your form has been submitted successfully, please wait while we match you
            </Typography >
        </Box>
    );
};

/* const BuddyMatch = () => {
    console.log("BuddyMatch is getting called")

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the user's token
                console.log(token);
                const response = await fetch('http://localhost:5032/findBuddy', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setMatches(data.matches); // Update matches state with fetched data
                } else {
                    setError(data.error || 'Failed to fetch matches');
                }
            } catch (err) {
                setError('An unexpected error occurred');
            } finally {
                setLoading(false); // Stop the loading indicator
            }
        };

        fetchMatches();
    }, []); // Runs only once when the component mounts

    if (loading) {
        return (
            <Box sx={{ p: 4 }}>
                <NavBar />
                <Typography variant="h5">Loading your matches...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <NavBar />
                <Typography variant="h5" color="error">
                    {error}
                </Typography>
                <Button variant="contained" onClick={() => navigate('/buddy')}>
                    Go Back
                </Button>
            </Box>
        );
    }

    if (matches.length === 0) {
        return (
            <Box sx={{ p: 4 }}>
                <NavBar />
                <Typography variant="h5">No matches found!</Typography>
                <Button variant="contained" onClick={() => navigate('/buddy')}>
                    Update Preferences
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <NavBar />
            <Typography variant="h4" gutterBottom>
                Your Bruin Buddy Matches
            </Typography>
            <Box>
                {matches.map((match, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{match.name}</Typography>
                            <Typography variant="body2">
                                Fitness Level: {match.fitnessLevel}
                            </Typography>
                            <Typography variant="body2">
                                Motivation Style: {match.motivationStyle}
                            </Typography>
                            <Typography variant="body2">
                                Preferred Gym: {match.gymPreference}
                            </Typography>
                            <Typography variant="body2">
                                Availability: {match.availability.join(', ')}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}; */

export default BuddyMatch;

