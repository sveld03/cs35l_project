import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material';

const MachineFilter = ({ preferences }) => {
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        const fetchMachines = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/gymMachines/gymData/');
                if (!response.ok) {
                    throw new Error('Failed to fetch machine data');
                }
                const data = await response.json();
                setMachines(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMachines();
    }, []);

    const filteredMachines = machines.filter(machine => {
        return (
            (preferences.Free_Body_Machine === "Any" || machine.Free_Body_Machine === preferences.Free_Body_Machine) &&
            (preferences.Cardio_Resistance === "Any" || machine.Cardio_Resistance === preferences.Cardio_Resistance) &&
            (preferences.Muscle_Groups.some(muscle => machine.Muscle_Groups.includes(muscle))) &&
            (preferences.Uni_Bi === "Any" || machine.Uni_Bi === preferences.Uni_Bi)
        );
    });

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

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
};

export default MachineFilter;
