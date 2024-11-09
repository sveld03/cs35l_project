import React from 'react';
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

const Section = ({ title, children }) => (
    <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            {title}
        </Typography>
        {children}
    </Box>
);

const UserInfo = () => (
    <Section title="About You">
        <TextField fullWidth margin="normal" required label="Name" variant="outlined" />
        <TextField fullWidth margin="normal" required label="Age" type="number" variant="outlined" />
        <FormControl margin="normal">
            <FormLabel required>Gender</FormLabel>
            <RadioGroup row name="gender">
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    </Section>
);

const ContactInfo = () => (
    <Section title="Contact Info">
        <TextField fullWidth margin="normal" required label="Email" variant="outlined" />
        <TextField fullWidth margin="normal" required label="Phone Number" variant="outlined" />
        <TextField fullWidth margin="normal" required label="Instagram" variant="outlined" />
        <FormControl margin="normal">
            <FormLabel required>Preferred Method of Contact</FormLabel>
            <RadioGroup row name="contactMethod" defaultValue="Phone">
                <FormControlLabel value="Email" control={<Radio />} label="Email" />
                <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
                <FormControlLabel value="Instagram" control={<Radio />} label="Instagram" />
            </RadioGroup>
        </FormControl>
    </Section>
);

const FitnessInfo = () => (
    <Section title="Fitness">
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Fitness Level</FormLabel>
                <RadioGroup row name="fitnessLevel">
                    <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                    <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                    <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Goal</FormLabel>
                <RadioGroup row name="fitnessGoal">
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
                <RadioGroup row name="gymPreference">
                    <FormControlLabel value="Wooden" control={<Radio />} label="Wooden" />
                    <FormControlLabel value="Bfit" control={<Radio />} label="Bfit" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Motivation Style</FormLabel>
                <RadioGroup row name="motivationStyle" defaultValue="Unsure">
                    <FormControlLabel value="Unsure" control={<Radio />} label="Unsure" />
                    <FormControlLabel value="Flexible" control={<Radio />} label="Flexible" />
                    <FormControlLabel value="Supportive" control={<Radio />} label="Supportive" />
                    <FormControlLabel value="Competitive" control={<Radio />} label="Competitive" />
                </RadioGroup>
            </FormControl>
        </Box>
    </Section>
);

const Availability = () => (
    <Section title="Availability">

    </Section>
);

const BuddyPreferences = () => (
    <Section title="About Your Buddy">
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Preferred Gender</FormLabel>
                <RadioGroup row name="buddyGender">
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Preferred Fitness Level</FormLabel>
                <RadioGroup row name="buddyFitnessLevel">
                    <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                    <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                    <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box>
            <FormControl margin="normal">
                <FormLabel required>Preferred Motivation Style</FormLabel>
                <RadioGroup row name="buddyMotivationStyle" defaultValue="Unsure">
                    <FormControlLabel value="Unsure" control={<Radio />} label="Unsure" />
                    <FormControlLabel value="Flexible" control={<Radio />} label="Flexible" />
                    <FormControlLabel value="Supportive" control={<Radio />} label="Supportive" />
                    <FormControlLabel value="Competitive" control={<Radio />} label="Competitive" />
                </RadioGroup>
            </FormControl>
        </Box>
    </Section>
);

const BruinBuddy = () => (
    <Box>
        <NavBar />
        <Container sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Find a Bruin Buddy
            </Typography>
            <UserInfo />
            <ContactInfo />
            <FitnessInfo />
            <Availability />
            <BuddyPreferences />
            <Button
                style={{
                    textTransform: 'none',
                    fontSize: '1.25rem',
                    padding: '2px 12px',
                    minWidth: '120px',
                    backgroundColor: "#dc2626",
                    marginLeft: 'auto'        // Adds space to push the rest to the left
                }}
                variant="contained"
                href="/buddy"
            >
                Find a Bruin Buddy
            </Button>
        </Container>
    </Box>
);

export default BruinBuddy;
