import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NavBar from '../components/NavBar';
import Chip from '@mui/material/Chip'; // For displaying tags/categories

// Import your data
const machinesData = require('../data/gym_database.machines.json')

const AllMachines = () => {
    return (
        <Box>
            <NavBar />
            
            {/* Page Header */}
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gym Equipment Directory
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Browse all machines at the Bruin Fitness Center
                </Typography>
            </Box>

            {/* Machines Grid */}
            <Grid2 container spacing={3} sx={{ px: 4 }}>
                {machinesData.map((machine, index) => (
                    <Grid2 item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {machine.Equipment_Name}
                                </Typography>
                                
                                <Box sx={{ mb: 2 }}>
                                    <Chip 
                                        label={machine.Cardio_Resistance}
                                        color={machine.Cardio_Resistance.toLowerCase() === "cardio" ? "primary" : "secondary"}
                                        size="small"
                                        sx={{ mr: 1, mb: 1 }}
                                    />
                                    <Chip 
                                        label={machine.Free_Body_Machine}
                                        variant="outlined"
                                        size="small"
                                        sx={{ mr: 1, mb: 1 }}
                                    />
                                </Box>

                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <strong>Location:</strong> {machine.Location}
                                </Typography>
                                
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <strong>Quantity:</strong> {machine.Quantity}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    <strong>Muscle Groups:</strong> {machine.Muscle_Groups}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    <strong>Movement Type:</strong> {machine.Uni_Bi}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

export default AllMachines;