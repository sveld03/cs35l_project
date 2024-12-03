import React, { useState } from 'react';
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

            <MachineForm onSubmit={handleFormSubmit} />
            {preferences && <MachineFilter preferences={preferences} />}

        </Box>
    );
};

export default RecommendedMachines;