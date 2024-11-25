import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material';

const MachineFilter = ({ preferences }) => {
    const machines = require('../data/gym_database.machines.json')
    const filteredMachines = machines.filter(machine => {
        return (
            (preferences.Free_Body_Machine === "Any" || machine.Free_Body_Machine === preferences.Free_Body_Machine) &&
            (preferences.Cardio_Resistance === "Any" || machine.Cardio_Resistance === preferences.Cardio_Resistance) &&
            (preferences.Muscle_Groups.some(muscle => machine.Muscle_Groups.includes(muscle))) &&
            (preferences.Uni_Bi === "Any" || machine.Uni_Bi === preferences.Uni_Bi)
        );
    });

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Recommended Equipment
            </Typography>

            {filteredMachines.length > 0 ? (
                <Grid container spacing={3}>
                    {filteredMachines.map((machine, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
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
                                        <strong>Movement:</strong> {machine.Uni_Bi}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
                    No recommendations found for your selection.
                </Typography>
            )}
        </Box>
    );

    /* return (
        <div>
            <h2>Recommended Equipment</h2>
            {filteredMachines.length > 0 ? (
                <ul>
                    {filteredMachines.map((machine, index) => (
                        <li key={index}>
                            <h3>{machine.Equipment_Name}</h3>
                            <p>Type: {machine.Free_Body_Machine}</p>
                            <p>Category: {machine.Cardio_Resistance}</p>
                            <p>Location: {machine.Location}</p>
                            <p>Quantity: {machine.Quantity}</p>
                            <p>Muscle Groups: {machine.Muscle_Groups}</p>
                            <p>Movement: {machine.Uni_Bi}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul>
                    <p>No recommendations found for your selection.</p>
                </ul>
            )}
        </div>
    ); */
};

export default MachineFilter;
