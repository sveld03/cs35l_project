import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import NavBar from '../components/NavBar';

const Home = () => {
    return (
        <Box>
            <NavBar />
            <Alert severity="success" onClose={() => { }}>
                You have logged in successfully
            </Alert>
            <Box display="flex" justifyContent="space-between" mt={2}>
                {/* Dining Section */}
                <Box flex={1} mr={2}>
                    <Typography variant="h3" gutterBottom>
                        <Link href="./dining" underline="none">Dining</Link>
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Open Now & Activity Level
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <Link
                            href="http://menu.dining.ucla.edu/Menus/Epicuria"
                            underline="none"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Epicuria
                        </Link>
                        <Rating size="small" name="Epicura Rating" value={5} readOnly />
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <Link
                            href="http://menu.dining.ucla.edu/Menus/DeNeve"
                            underline="none"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            De Neve
                        </Link>
                        <Rating size="small" name="De Neve Rating" value={1} readOnly />
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Open Later
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <Link
                            href="http://menu.dining.ucla.edu/Menus/BruinPlate"
                            underline="none"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Bruin Plate
                        </Link>
                        <Rating size="small" name="Bruin Plate Rating" value={1} readOnly />
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Closed
                    </Typography>
                </Box>

                {/* Gym Section */}
                <Box flex={1} ml={2}>
                    <Typography variant="h3" gutterBottom>
                        <Link href="./gym" underline="none">Gym</Link>
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Open Now & Activity Level
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Bruin Buddies
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
