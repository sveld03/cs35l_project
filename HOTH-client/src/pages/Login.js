import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/users/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Invalid credentials');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            padding={2}
        >
            <Typography variant="h4" gutterBottom>
                Log In
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ width: '100%', maxWidth: 400 }}
                onSubmit={handleLogin}
            >
                <TextField
                    fullWidth
                    margin="normal"
                    label="UCLA Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
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
                {error && (
                    <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 2, backgroundColor: "#dc2626" }}
                    type="submit"
                >
                    Log In
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    sx={{ marginTop: 2 }}
                    onClick={() => navigate('/register')}
                >
                    Create Account
                </Button>
            </Box>
        </Box>
    );
};

export default Login;
