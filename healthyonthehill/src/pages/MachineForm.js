import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Button, OutlinedInput, Checkbox, ListItemText } from '@mui/material';

const muscleGroups = [
    "Chest", "Back", "Biceps", "Triceps", "Shoulders", "Core", "Hamstrings", "Quadriceps", "Gluteals", "Calves"
];

const MachineForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        Cardio_Resistance: '',
        Muscle_Groups: [],
        Free_Body_Machine: '',
        Uni_Bi: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'Muscle_Groups' ? e.target.value : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box>
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Machine Recommendation Form
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Fill out the form below to get personalized gym equipment recommendations.
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ px: 4 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card sx={{ p: 3 }}>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="cardio-resistance-label">Cardio or Resistance</InputLabel>
                                    <Select
                                        labelId="cardio-resistance-label"
                                        name="Cardio_Resistance"
                                        value={formData.Cardio_Resistance}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Any">Any</MenuItem>
                                        <MenuItem value="Cardio">Cardio</MenuItem>
                                        <MenuItem value="Resistance">Resistance</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="muscle-groups-label">Target Muscle Groups</InputLabel>
                                    <Select
                                        labelId="muscle-groups-label"
                                        name="Muscle_Groups"
                                        multiple
                                        value={formData.Muscle_Groups}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Target Muscle Groups" />}
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                        {muscleGroups.map((group) => (
                                            <MenuItem key={group} value={group}>
                                                <Checkbox checked={formData.Muscle_Groups.includes(group)} />
                                                <ListItemText primary={group} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="equipment-type-label">Equipment Type</InputLabel>
                                    <Select
                                        labelId="equipment-type-label"
                                        name="Free_Body_Machine"
                                        value={formData.Free_Body_Machine}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Any">Any</MenuItem>
                                        <MenuItem value="Body Weight">Body Weight</MenuItem>
                                        <MenuItem value="Free Weight">Free Weight</MenuItem>
                                        <MenuItem value="Machine">Machine</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="movement-type-label">Bilateral or Unilateral</InputLabel>
                                    <Select
                                        labelId="movement-type-label"
                                        name="Uni_Bi"
                                        value={formData.Uni_Bi}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Any">Any</MenuItem>
                                        <MenuItem value="Bilateral">Bilateral</MenuItem>
                                        <MenuItem value="Unilateral">Unilateral</MenuItem>
                                    </Select>
                                </FormControl>

                                <Box sx={{ mt: 3 }}>
                                    <Button variant="contained" color="primary" type="submit" fullWidth>
                                        Get Recommendations
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MachineForm;

