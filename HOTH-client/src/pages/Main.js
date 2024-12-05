import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Login from '@mui/icons-material/Login';
import AnimatedText from '../components/AnimatedText';
import DiningHall from '../components/DiningHall';

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
                <DiningHall
                    key={"Epicuria"}
                    name={"Epicuria"}
                    status="O"
                    hour={2}
                    highlight={'Featured menu items'}
                />
                <DiningHall
                    key={"DeNeve"}
                    name={"DeNeve"}
                    status="L"
                    hour={5}
                    highlight={'Featured menu items'}
                />

            </Container>


        </Box >

    );
};

export default Main;
