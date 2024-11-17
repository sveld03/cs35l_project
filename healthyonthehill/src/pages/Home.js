import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NavBar from '../components/NavBar';
import GymData from '../components/GymData';
import DiningHall from '../components/DiningHall'
import LoginAlert from '../components/LoginAlert'

const Home = () => {
    const [showLoginAlert, setShowLoginAlert] = useState(false);

    useEffect(() => {
        const alertShown = localStorage.getItem('loginAlertShown');
        if (!alertShown) {
            setShowLoginAlert(true);
            localStorage.setItem('loginAlertShown', 'true');
        }
    }, []);

    return (
        <Box>
            <NavBar />
            {showLoginAlert && <LoginAlert />}
            <Box display="flex" justifyContent="space-between" mt={2}>
                {/* Dining Section */}
                <Box flex={1} mr={2}>
                    <Typography variant="h3" gutterBottom>
                        <Link href="./dining" underline="none">Dining</Link>
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Open Now & Activity Level
                    </Typography>
                    <DiningHall name="Epicuria" stars={4} status="O" hour={4} activity={70} highlight="Chicken Fettuccine Alfredo, Fettuccine w/ Creamy Tomato Sauce, North African Spiced Pork w/ Oven Roasted Tomatoes & Fregola, Risotto Parmigiano..." />
                    <DiningHall name="DeNeve" stars={1} status="O" hour={2} activity={36} highlight="Macadamia Nut Crumble Mahi Mahi, Hawaiian Roasted Pork..." />
                    <Typography variant="h5" gutterBottom>
                        Open Later
                    </Typography>
                    <DiningHall name="BruinPlate" stars={5} status="L" hour={5} highlight="Seared Tofu Quinoa Bowl w/ Ginger Miso Dressing, Rotini, Pesto, & Kale Bowl, Sesame Salmon & Bok Choy, Red Pepper & Pear Soup..." />
                    <Typography variant="h5" gutterBottom>
                        Closed for the Day
                    </Typography>
                    <DiningHall name="EpicAtAckerman" stars={5} status="C" />
                    <DiningHall name="FeastAtRieber" stars={3} status="C" />
                </Box>

                {/* Gym Section */}
                <Box flex={1} ml={2}>
                    <Typography variant="h3" gutterBottom>
                        <Link href="./gym" underline="none">Gym</Link>
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Open Now & Activity Level
                    </Typography>
                    <GymData facility="jwc" />
                    <GymData facility="bfit" />
                    <Typography variant="h5" gutterBottom>
                        Bruin Buddies
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                        Create your profile and get matched with a Bruin buddy!
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
