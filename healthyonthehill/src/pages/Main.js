import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Login from '@mui/icons-material/Login';
import AnimatedText from '../components/AnimatedText';
import GymData from '../components/GymData';

const Main = () => {

    return (

        <Box

            sx={{
                width: '100%',
                maxWidth: 800,
                height: '100vh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
            }
            }
        >
            <Container>
                <Typography variant="h2" gutterBottom>
                    Healthy 😋n The Hill
                </Typography>

                <AnimatedText />
                <Typography variant="h2" gutterBottom>

                </Typography>
                <Button variant="contained" size='medium' startIcon={<Login />} href="/login">
                    Sign in
                </Button>
            </Container>
            <Container>
                <Container>
                    <Typography variant="h3" gutterBottom>
                        Dining
                    </Typography>
                    <Typography>
                        Open Now:
                    </Typography>
                    <Typography>
                        Epicuria
                    </Typography>
                    <Typography>Bruin Plate
                    </Typography>
                    <Typography> The Study at Hedrick </Typography>
                    <Typography>
                        Opening Soon:
                    </Typography>

                </Container>
                <Container>
                    <Typography variant="h3" gutterBottom>
                        Gym
                    </Typography>
                    <GymData facility="jwc" />
                    <GymData facility="bfit" />
                    <Typography>
                        This will show a snapshot of gym data such as activity level and hours.
                    </Typography>
                </Container>
            </Container>


        </Box >

    );
};

export default Main;
