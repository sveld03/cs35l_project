import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NavBar from '../components/NavBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const Settings = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleEmailClick = () => {
        setSnackbarMessage("You can't edit your email address.");
        setSnackbarOpen(true);
    };

    const handlePasswordChangeClick = () => {
        console.log('New password:', password);
        setSnackbarMessage("You have changed your password.");
        setSnackbarOpen(true);
        setPassword('');
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
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                defaultValue="John Smith"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                disabled
                                id="outlined-disabled"
                                label="Email"
                                defaultValue="johnsmith@ucla.edu"
                                onClick={handleEmailClick}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ flex: 1 }}
                                />
                                <Button
                                    variant="contained"
                                    color="error"
                                    style={{
                                        marginLeft: '10px',
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        padding: '8px 16px',
                                    }}
                                    onClick={handlePasswordChangeClick}
                                >
                                    Change Password
                                </Button>
                            </Box>
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
