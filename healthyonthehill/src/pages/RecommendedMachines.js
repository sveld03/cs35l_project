import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';

import MachineForm from './MachineForm';
import MachineFilter from './MachineFilter';



const RecommendedMachines = () => {
    const [preferences, setPreferences] = useState(null);

    const handleFormSubmit = (formData) => {
        setPreferences(formData);
    };

    return (
        <Box>
            <NavBar />
            
            {/* Page Header */}
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gym Equipment Directory
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Browse all Equipment at the Bruin Fitness Center
                </Typography>
            </Box>
            <div>
                <h1>Fitness Equipment Recommendation</h1>
                <MachineForm onSubmit={handleFormSubmit} />
                {preferences && <MachineFilter preferences={preferences} />}
            </div>
        </Box>
    );
};

export default RecommendedMachines;