import React, { useState, useEffect } from 'react';
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


const Settings = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5032/getAccount', {
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
            const response = await fetch('http://localhost:5032/getAccount', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch current account details');
            }

            const currentData = await response.json();

            const updatedFields = {};
            if (name && name !== currentData.name) updatedFields.name = name;
            if (password && password !== '') updatedFields.password = password;

            if (Object.keys(updatedFields).length === 0) {
                setSnackbarMessage('No changes to update.');
                setSnackbarOpen(true);
                return;
            }

            const updateResponse = await fetch('http://localhost:5032/updateAccount', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedFields),
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update account');
            }

            const updateData = await updateResponse.json();
            setSnackbarMessage(updateData.message);
            setSnackbarOpen(true);
            setPassword('');
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
                bgcolor="#f9fafb"
                padding={2}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width={{ xs: '90%', sm: '60%', md: '40%' }}
                    bgcolor="white"
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
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
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
