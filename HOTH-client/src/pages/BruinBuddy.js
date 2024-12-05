import React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Section = ({ title, children }) => (
    <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            {title}
        </Typography>
        {children}
    </Box>
);



const ContactInfo = ({ formData, handleChange }) => (
    <Section title="Contact Info">
        <TextField
            fullWidth
            margin="normal"
            required
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
        <TextField
            fullWidth
            margin="normal"
            required
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
        />
        <TextField
            fullWidth
            margin="normal"
            required
            label="Instagram"
            variant="outlined"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
        />
        <FormControl margin="normal">
            <FormLabel required>Preferred Method of Contact</FormLabel>
            <RadioGroup row name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
                <FormControlLabel value="Email" control={<Radio />} label="Email" />
                <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
                <FormControlLabel value="Instagram" control={<Radio />} label="Instagram" />
            </RadioGroup>
        </FormControl>
    </Section>
);

const FitnessInfo = ({ formData, handleChange }) => (
    <Section title="Fitness">
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Fitness Level</FormLabel>
                <RadioGroup row name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange}>
                    <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                    <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                    <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Goal</FormLabel>
                <RadioGroup row name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange}>
                    <FormControlLabel value="Weight Loss" control={<Radio />} label="Weight Loss" />
                    <FormControlLabel value="Muscle Gain" control={<Radio />} label="Muscle Gain" />
                    <FormControlLabel value="Endurance" control={<Radio />} label="Cardiovascular Endurance" />
                    <FormControlLabel value="Flexibility" control={<Radio />} label="Flexibility" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Gym Preference</FormLabel>
                <RadioGroup row name="gymPreference" value={formData.gymPreference} onChange={handleChange}>
                    <FormControlLabel value="Wooden" control={<Radio />} label="Wooden" />
                    <FormControlLabel value="Bfit" control={<Radio />} label="Bfit" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Motivation Style</FormLabel>
                <RadioGroup row name="motivationStyle" value={formData.motivationStyle} onChange={handleChange}>
                    <FormControlLabel value="Unsure" control={<Radio />} label="Unsure" />
                    <FormControlLabel value="Flexible" control={<Radio />} label="Flexible" />
                    <FormControlLabel value="Supportive" control={<Radio />} label="Supportive" />
                    <FormControlLabel value="Competitive" control={<Radio />} label="Competitive" />
                </RadioGroup>
            </FormControl>
        </Box>
    </Section>
);

const Availability = ({ availability, handleAvailabilityChange }) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const timeSlots = ["Morning", "Afternoon", "Evening"];

    const toggleAvailability = (timeIndex, dayIndex) => {
        const updatedAvailability = availability.map((row, tIndex) =>
            row.map((slot, dIndex) =>
                tIndex === timeIndex && dIndex === dayIndex ? !slot : slot
            )
        );
        handleAvailabilityChange(updatedAvailability);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Availability
            </Typography>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "left", padding: "10px" }}>Time of Day</th>
                        {daysOfWeek.map((day) => (
                            <th key={day} style={{ textAlign: "center", padding: "10px" }}>
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((time, timeIndex) => (
                        <tr key={time}>
                            <td style={{ padding: "10px", fontWeight: "bold" }}>{time}</td>
                            {daysOfWeek.map((_, dayIndex) => (
                                <td
                                    key={dayIndex}
                                    onClick={() => toggleAvailability(timeIndex, dayIndex)}
                                    style={{
                                        padding: "10px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                        backgroundColor: availability[timeIndex][dayIndex] ? "#4caf50" : "#f1f1f1",
                                        border: "1px solid #ccc",
                                    }}
                                >
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};


const BuddyPreferences = ({ formData, handleChange }) => (
    <Section title="About Your Buddy">
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Preferred Gender</FormLabel>
                <RadioGroup row name="buddyGender" value={formData.buddyGender} onChange={handleChange}>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Preferred Fitness Level</FormLabel>
                <RadioGroup row name="buddyFitnessLevel" value={formData.buddyFitnessLevel} onChange={handleChange}>
                    <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                    <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                    <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Preferred Motivation Style</FormLabel>
                <RadioGroup row name="buddyMotivationStyle" value={formData.buddyMotivationStyle} onChange={handleChange}>
                    <FormControlLabel value="Unsure" control={<Radio />} label="Unsure" />
                    <FormControlLabel value="Flexible" control={<Radio />} label="Flexible" />
                    <FormControlLabel value="Supportive" control={<Radio />} label="Supportive" />
                    <FormControlLabel value="Competitive" control={<Radio />} label="Competitive" />
                </RadioGroup>
            </FormControl>
        </Box>
    </Section>
);

const BruinBuddy = () => {
    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        instagram: '',
        contactMethod: '',
        fitnessLevel: '',
        fitnessGoal: '',
        gymPreference: '',
        motivationStyle: '',
        availability: Array(3).fill().map(() => Array(7).fill(false)),
        buddyGender: '',
        buddyFitnessLevel: '',
        buddyMotivationStyle: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAvailabilityChange = (updatedAvailability) => {
        setFormData((prevData) => ({
            ...prevData,
            availability: updatedAvailability,
        }));
    };

    const transformAvailability = (availabilityArray) => {
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const timeSlots = ["Morning", "Afternoon", "Evening"];
    
        const result = [];
    
        availabilityArray.forEach((dayAvailability, dayIndex) => {
            const availableTimes = dayAvailability
                .map((isAvailable, timeIndex) => (isAvailable ? timeSlots[timeIndex] : null))
                .filter(Boolean); // Remove null values (unavailable times)
    
            if (availableTimes.length > 0) {
                result.push({
                    day: daysOfWeek[dayIndex],
                    times: availableTimes,
                });
            }
        });
    
        return result;
    };

    const handleSubmit = async () => {


        const {
            email,
            phoneNumber: phone,
            instagram,
            contactMethod: preferredContactMethod,
            fitnessLevel,
            fitnessGoal,
            gymPreference,
            buddyMotivationStyle: motivationStyle,
            availability,
            buddyGender: preferredGender,
            buddyFitnessLevel: preferredFitnessLevel,
            buddyMotivationStyle: preferredMotivationStyle
        } = formData;
    
        const requestBody = {
            fitnessLevel,
            goal: fitnessGoal,
            availability: transformAvailability(formData.availability),
            gymPreference,
            motivationStyle,
            contact: { phone }
        };

        const response = await fetch("http://localhost:4000/api/gymBuddy/update", {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${window.localStorage.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // Call backend to send email
        const _response = await fetch('http://localhost:4000/api/users/auth/send-thank-you-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email }),
        });

        if (response.ok) {
            console.log('Email sent successfully');
        } else {
            console.error('Failed to send email');
        }

            navigate('/buddy/match');
        }

    /* const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');

            console.log("let's see if we make it here.");

            const response = await fetch('http://localhost:5032/updateBuddyPreferences', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fitnessInfo: {
                        gender: formData.gender,
                        fitnessLevel: formData.fitnessLevel,
                        fitnessGoal: formData.fitnessGoal,
                        gymPreference: formData.gymPreference,
                        motivationStyle: formData.motivationStyle,
                        availability: formData.availability,
                    },
                    buddyPreferences: {
                        buddyGender: formData.buddyGender,
                        buddyFitnessLevel: formData.buddyFitnessLevel,
                        buddyMotivationStyle: formData.buddyMotivationStyle,
                    },
                })
            })

            if (response.ok) {
                console.log('Preferences updated successfully');
                navigate('/buddy/match');
            } else {
                console.error('Failed to update preferences');
            }
        }
        catch (err) {
            console.error('Error:', err);
        }
    }; */

    return (
        <Box>
            <NavBar />
            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Find a Bruin Buddy - Enter your info to find a match
                </Typography>
                <ContactInfo formData={formData} handleChange={handleChange} />
                <FitnessInfo formData={formData} handleChange={handleChange} />
                <Availability availability={formData.availability} handleAvailabilityChange={handleAvailabilityChange} />;
                <BuddyPreferences formData={formData} handleChange={handleChange} />
                <Button
                    style={{
                        textTransform: 'none',
                        fontSize: '1.25rem',
                        padding: '2px 12px',
                        minWidth: '120px',
                        backgroundColor: "#dc2626",
                        marginLeft: 'auto'
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Find a Bruin Buddy
                </Button>
            </Container>
        </Box>
    );
};

export default BruinBuddy;