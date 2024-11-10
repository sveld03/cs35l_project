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
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';

const Section = ({ title, children }) => (
    <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            {title}
        </Typography>
        {children}
    </Box>
);

const UserInfo = ({ formData, handleChange }) => (
    <Section title="About You">
        <TextField
            fullWidth
            margin="normal"
            required
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
        />
        <TextField
            fullWidth
            margin="normal"
            required
            label="Age"
            variant="outlined"
            name="age"
            value={formData.age}
            onChange={handleChange}
        />
        <FormControl margin="normal">
            <FormLabel required>Gender</FormLabel>
            <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    </Section>
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

const Availability = ({ formData, handleChange }) => (
    <Section title="Availability">
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Preferred Time</FormLabel>
                <RadioGroup row name="timeOfDay" value={formData.timeOfDay} onChange={handleChange}>
                    <FormControlLabel value="Morning" control={<Radio />} label="Morning" />
                    <FormControlLabel value="Afternoon" control={<Radio />} label="Afternoon" />
                    <FormControlLabel value="Evening" control={<Radio />} label="Evening" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Preferred Days</FormLabel>
                <FormGroup row>
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                        <FormControlLabel
                            key={day}
                            control={
                                <Checkbox
                                    checked={formData.preferredDays.includes(day)}
                                    onChange={handleChange}
                                    name="preferredDays"
                                    value={day}
                                />
                            }
                            label={day}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </Box>
    </Section>
);

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
        name: '',
        age: '',
        gender: '',
        email: '',
        phoneNumber: '',
        instagram: '',
        contactMethod: '',
        fitnessLevel: '',
        fitnessGoal: '',
        gymPreference: '',
        motivationStyle: '',
        timeOfDay: '',
        preferredDays: [],
        buddyGender: '',
        buddyFitnessLevel: '',
        buddyMotivationStyle: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevState => ({
                ...prevState,
                preferredDays: checked
                    ? [...prevState.preferredDays, value]
                    : prevState.preferredDays.filter(day => day !== value)
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = () => {
        console.log(formData); // Logs the form data to the console
        navigate('/buddy/match'); // Redirects to the match page
    };

    return (
        <Box>
            <NavBar />
            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Find a Bruin Buddy
                </Typography>
                <UserInfo formData={formData} handleChange={handleChange} />
                <ContactInfo formData={formData} handleChange={handleChange} />
                <FitnessInfo formData={formData} handleChange={handleChange} />
                <Availability formData={formData} handleChange={handleChange} />
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
                    onClick={handleSubmit} // Call handleSubmit on button click
                >
                    Find a Bruin Buddy
                </Button>
            </Container>
        </Box>
    );
};

export default BruinBuddy;