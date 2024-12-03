import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NavBar from '../components/NavBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const Settings = () => {
    const theme = useTheme();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:4000/api/users/auth/getAccount', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch account details');
                }

                const data = await response.json();
                setName(data.name);
                setEmail(data.email);
                setGender(data.gender || ''); // Set the gender if available
                setAge(data.age || ''); // Set the age if available
            } catch (error) {
                console.error(error.message);
                setSnackbarMessage('Error fetching account details.');
                setSnackbarOpen(true);
            }
        };

        fetchAccount();
    }, []);

    const handleEmailClick = () => {
        setSnackbarMessage("You can't edit your email address.");
        setSnackbarOpen(true);
    };

    const handleSaveChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/users/auth/updateAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name || undefined,
                    password: password || undefined,
                    gender: gender || undefined,
                    age: age || undefined,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update account');
            }

            const updateData = await response.json();
            setSnackbarMessage(updateData.message);
            setSnackbarOpen(true);
            setPassword('');  // Clear the password field after saving
        } catch (error) {
            console.error(error.message);
            setSnackbarMessage('Error updating account details.');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Box>
            <NavBar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor={theme.palette.background.default}
                padding={2}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width={{ xs: '90%', sm: '60%', md: '40%' }}
                    bgcolor={theme.palette.background.paper}
                    color={theme.palette.text.primary}
                    boxShadow={3}
                    padding={4}
                    borderRadius={2}
                >
                    <Typography variant="h5" gutterBottom>
                        Settings
                    </Typography>

                    <Grid container spacing={2} width="100%">
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                disabled
                                label="Email"
                                value={email}
                                onClick={handleEmailClick}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    label="Gender"
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Transgender">Transgender</MenuItem>
                                    <MenuItem value="Non-binary">Non-binary</MenuItem>
                                    <MenuItem value="Prefer not to disclose">Prefer not to disclose</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Age"
                                variant="outlined"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    padding: '8px 16px',
                                }}
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2500}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default Settings;
