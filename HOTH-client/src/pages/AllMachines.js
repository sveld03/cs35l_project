import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NavBar from '../components/NavBar';
import Chip from '@mui/material/Chip';

const AllMachines = () => {
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

    if (loading) {
        return (
            <Box>
                <NavBar />
                <Typography variant="h5" sx={{ p: 4 }}>
                    Loading...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <NavBar />
                <Typography variant="h5" color="error" sx={{ p: 4 }}>
                    {error}
                </Typography>
            </Box>
        );
    }

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
                {machines.map((machine, index) => (
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
