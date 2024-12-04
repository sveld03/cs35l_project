import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import GymData from '../components/GymData';
import DiningHall from '../components/DiningHall';
import LoginAlert from '../components/LoginAlert';

const Home = () => {
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [openDiningHalls, setOpenDiningHalls] = useState([]);
    const [laterDiningHalls, setLaterDiningHalls] = useState([]);
    const [closedDiningHalls, setClosedDiningHalls] = useState([]);

    useEffect(() => {
        const alertShown = localStorage.getItem('loginAlertShown');
        if (!alertShown) {
            setShowLoginAlert(true);
            localStorage.setItem('loginAlertShown', 'true');
        }
        const fetchDiningData = async () => {
            const nameMapping = {
                'Epicuira': 'Epicuria',
                'De Neve': 'DeNeve',
                'Spice Kitchen at Feast': 'FeastAtRieber',
                'Bruin Plate': 'BruinPlate',
                'Bruin Café': 'BruinCafe',
                'Café 1919': 'Cafe1919',
                'Rendezvous': 'Rendezvous',
                'The Study at Hedrick': 'HedrickStudy',
                'The Drey': 'Drey',
                'Epic at Ackerman': 'EpicAtAckerman',
                'De Neve Late Night': 'DeNeveLateNight'
            };

            const mapDiningNames = (data) =>
                data.map((item) => ({
                    ...item,
                    name: nameMapping[item.name] || item.name
                }));

            try {
                const openResponse = await fetch('http://localhost:1338/open');
                const openData = await openResponse.json();
                const openMapped = mapDiningNames(openData);
                setOpenDiningHalls(openMapped);
            } catch (error) {
                console.error('Error fetching open dining halls:', error);
            }

            try {
                const laterResponse = await fetch('http://localhost:1338/later');
                const laterData = await laterResponse.json();
                const laterMapped = mapDiningNames(laterData);
                setLaterDiningHalls(laterMapped);
            } catch (error) {
                console.error('Error fetching later dining halls:', error);
            }

            try {
                const closedResponse = await fetch('http://localhost:1338/closed');
                const closedData = await closedResponse.json();
                const closedMapped = mapDiningNames(closedData);
                setClosedDiningHalls(closedMapped);
            } catch (error) {
                console.error('Error fetching closed dining halls:', error);
            }
        };


        fetchDiningData();
    }, []);

    return (
        <Box>
            <NavBar />
            {showLoginAlert && <LoginAlert />}
            <Box display="flex" justifyContent="space-between" mt={2}>
                {/* Dining Section */}
                <Box flex={1} mr={2}>
                    <Typography variant="h3" gutterBottom>
                        Dining
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Open Now
                    </Typography>
                    {openDiningHalls.length === 0 ? (
                        <Typography variant="h6" color="textSecondary">
                            No dining halls are currently open.
                        </Typography>
                    ) : (
                        openDiningHalls.map((hall) => (
                            <DiningHall
                                key={hall.name}
                                name={hall.name}
                                status="O"
                                hour={hall.time}
                                highlight={hall.highlights || 'Featured menu items...'}
                            />
                        ))
                    )}
                    <Typography variant="h5" gutterBottom>
                        Open Later
                    </Typography>
                    {laterDiningHalls.map((hall) => (
                        <DiningHall
                            key={hall.name}
                            name={hall.name}
                            status="L"
                            hour={hall.time}
                            highlight={hall.highlights || 'Opening menu highlights...'}
                        />
                    ))}
                    <Typography variant="h5" gutterBottom>
                        Closed for the Day
                    </Typography>
                    {closedDiningHalls.map((hall) => (
                        <DiningHall
                            key={hall.name}
                            name={hall.name}
                            status="C"
                        />
                    ))}
                </Box>

                {/* Gym Section */}
                <Box flex={1} ml={2}>
                    <Typography variant="h3" gutterBottom>
                        Gym
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Activity Level
                    </Typography>
                    <GymData facility="jwc" />
                    <GymData facility="bfit" />

                </Box>
            </Box>
        </Box>
    );
};

export default Home;
