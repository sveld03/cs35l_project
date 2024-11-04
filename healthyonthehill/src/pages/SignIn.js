import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const SignIn = () => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                This will eventually take you to the Sign In With Google page
            </Typography >
            <Button variant="contained" href="/">
                Go back to home page :)
            </Button>
            <Button variant="contained" href="/home">
                Imitate Log in
            </Button>
        </Box>

    );
};

export default SignIn;
