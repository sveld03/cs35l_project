import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';




const BruinBuddy = () => {

    return (
        <Box>
            <NavBar />
            <Typography variant="h5" gutterBottom>
                <Box>
                    Find a Bruin Buddy
                </Box>
                About you:
                <Box>
                    <TextField id="margin-normal" margin="normal" required label="Name" variant="outlined" />
                </Box>
                <Box>
                    <TextField id="margin-normal" margin="normal" required label="Age" type="number" variant="outlined" />
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label" required>Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </Box>



                Contact info
                <Box>
                    <TextField id="margin-normal" margin="normal" required label="Email" variant="outlined" />
                </Box>

                <Box>
                    <TextField id="margin-normal" margin="normal" required label="Phone Number" variant="outlined" />
                </Box>
                <Box>
                    <TextField id="margin-normal" margin="normal" required label="Instagram" variant="outlined" />
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label" required>Preferred Method of Contact</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue="Phone"
                        >
                            <FormControlLabel value="Email" control={<Radio />} label="Email" />
                            <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
                            <FormControlLabel value="Instagram" control={<Radio />} label="Instagram" />

                        </RadioGroup>
                    </FormControl>
                </Box>
                Fitness:
                <Box>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label" required>Fitness Level</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                            <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                            <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label" required>Goal</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Weight Loss" control={<Radio />} label="Weight Loss" />
                            <FormControlLabel value="Muscle Gain" control={<Radio />} label="Muscle Gain" />
                            <FormControlLabel value="Cardiovascular Endurance" control={<Radio />} label="Cardiovascular Endurance" />
                            <FormControlLabel value="Flexibility" control={<Radio />} label="Flexibility" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                Availability

                <Box>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label" required>Gym Preference</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Wooden" control={<Radio />} label="Wooden" />
                            <FormControlLabel value="Bfit" control={<Radio />} label="Bfit" />

                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label" required>Motivation Style</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue="Unsure"
                        >
                            <FormControlLabel value="Unsure" control={<Radio />} label="Unsure" />
                            <FormControlLabel value="Flexible" control={<Radio />} label="Flexible" />
                            <FormControlLabel value="Supportive" control={<Radio />} label="Supportive" />
                            <FormControlLabel value="Competitive" control={<Radio />} label="Competitive" />
                        </RadioGroup>
                    </FormControl>
                </Box>



                About your buddy:

                <Box>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label" required>Preferred Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label" required>Preferred Fitness Level</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                            <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                            <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label" required>Preferred Motivation Style</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue="Unsure"
                        >
                            <FormControlLabel value="Unsure" control={<Radio />} label="Unsure" />
                            <FormControlLabel value="Flexible" control={<Radio />} label="Flexible" />
                            <FormControlLabel value="Supportive" control={<Radio />} label="Supportive" />
                            <FormControlLabel value="Competitive" control={<Radio />} label="Competitive" />
                        </RadioGroup>
                    </FormControl>
                </Box>


            </Typography >
        </Box>

    );
};

export default BruinBuddy;
