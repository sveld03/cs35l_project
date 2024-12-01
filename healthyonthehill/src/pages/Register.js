import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const theme = useTheme(); // Access the theme for dynamic colors
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [emailError, setEmailError] = useState(false); // Tracks if email is invalid

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (value.includes('@') && value.endsWith('ucla.edu')) {
            setEmailError(false);
        } else {
            setEmailError(true); 
        }
    };

    const handleRegisterClick = async () => {
        if (name && email && password && !emailError) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                setSnackbarMessage(
                    'Password must be at least 8 characters long, contain one uppercase letter and one number.'
                );
                setSnackbarOpen(true);
                return;
            }
            try {
                const response = await fetch('http://localhost:5032/createAccount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();
                if (response.ok && data.token) {
                    localStorage.setItem('token', data.token);
                    setSnackbarMessage('Registration successful! Redirecting...');
                    setSnackbarOpen(true);
                    setTimeout(() => {
                        navigate('/home');
                        setName('');
                        setEmail('');
                        setPassword('');
                    }, 800);
                } else {
                    setSnackbarMessage(data.error || 'Registration failed.');
                    setSnackbarOpen(true);
                }
            } catch (error) {
                setSnackbarMessage('An error occurred. Please try again.');
                console.error('Error:', error);
            }
        } else if (emailError) {
            setSnackbarMessage('Please use a valid UCLA email.');
            setSnackbarOpen(true);
        } else {
            setSnackbarMessage('Please fill out all fields.');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleLoginRedirect = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor={theme.palette.background.default} // Use theme's background color
                padding={2}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width={{ xs: '90%', sm: '60%', md: '40%' }}
                    bgcolor={theme.palette.background.paper} // Use theme's paper background
                    boxShadow={3}
                    padding={4}
                    borderRadius={2}
                >
                    <Typography variant="h5" gutterBottom color="text.primary">
                        Register
                    </Typography>

                    <Grid container spacing={2} width="100%">
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="name"
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                label="UCLA Email"
                                variant="outlined"
                                value={email}
                                onChange={handleEmailChange}
                                error={emailError} // Highlight box in red if emailError is true
                                helperText={emailError ? 'Must be a UCLA email (@ucla.edu or @g.ucla.edu).' : ''} // Show error message
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
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    padding: '10px 16px',
                                }}
                                onClick={handleRegisterClick}
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>

                    <Typography
                        variant="body2"
                        marginTop={2}
                        color="text.secondary" // Dynamic text color
                    >
                        Already have an account?{' '}
                        <Link
                            component="button"
                            onClick={handleLoginRedirect}
                            style={{ color: theme.palette.primary.main }} // Dynamic link color
                        >
                            Login
                        </Link>
                    </Typography>
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

export default Register;
