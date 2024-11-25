import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar'

const GymBuddy = () => {
    return (
        <Box>
            <NavBar />
            <Typography variant="h5" gutterBottom>
                This will eventually take you to the Gym Buddy page
            </Typography >

        </Box>

    );
};

export default GymBuddy;