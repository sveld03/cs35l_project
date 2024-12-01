import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function GymData({ facility }) {
    const [facilityData, setFacilityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:1337/facility?facility=${facility}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setFacilityData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [facility]);



    return (
        <Box>
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="facility-content"
                    id="facility-header"
                >
                    <Typography variant="h5">
                        {formatFacility(facility)}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : error ? (
                        <Typography color="error">Error: {error}</Typography>
                    ) : facilityData && facilityData.length > 0 ? (
                        facilityData.map((item, index) => (
                            <Box key={index} mb={2}>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography>Percentage: {item.percentage}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography>No data available.</Typography>
                    )}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default GymData;

function formatFacility(facilityData) {
    if (facilityData === "jwc") return "John Wooden Center"
    if (facilityData === "bfit") return "Bruin Fitness"
    if (facilityData === "krc") return "Kinross Recreation Center"
    else return ""
}
