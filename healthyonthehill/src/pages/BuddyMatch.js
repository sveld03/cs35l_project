import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar'

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

export default BuddyMatch;
