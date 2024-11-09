import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';  // This imports the useState hook from React

export default function NavBar() {

    // Add state for managing the gym dropdown menu
    const [gymAnchorEl, setGymAnchorEl] = useState(null);
    const open = Boolean(gymAnchorEl);

    // Handle opening the dropdown
    const handleGymClick = (event) => {
        setGymAnchorEl(event.currentTarget);
    };

    // Handle closing the dropdown
    const handleGymClose = () => {
        setGymAnchorEl(null);
    };

    return (
        <Box>
            <Box display="flex" alignItems="center">
                <Button
                    style={{
                        textTransform: 'none',
                        fontSize: '1.25rem',       // Increases font size
                        padding: '12px 24px',
                        minWidth: '120px',
                        color: '#000000',
                    }}
                    variant="text"
                    href="/home"
                >
                    Healthy 😋n the Hill
                </Button>

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
                    href="/home"
                >
                    Find a Bruin Buddy
                </Button>
                <Button
                    style={{
                        textTransform: 'none',
                        fontSize: '1.25rem',
                        padding: '12px 24px',
                        minWidth: '120px'
                    }}
                    variant="text"
                    href="/dining"
                >
                    Dining
                </Button>
                <Button
                    style={{
                        textTransform: 'none',
                        fontSize: '1.25rem',
                        padding: '12px 24px',
                        minWidth: '120px'
                    }}
                    variant="text"
                    onClick={handleGymClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    //href="/gym"
                >
                    Gym
                </Button>

                {/* Dropdown Menu */}
                <Menu
                    anchorEl={gymAnchorEl}
                    open={open}
                    onClose={handleGymClose}
                    MenuListProps={{
                        'aria-labelledby': 'gym-button',
                    }}
                >
                    <MenuItem onClick={handleGymClose} component="a" href="/gym/all-machines">
                        See All Machines
                    </MenuItem>
                    <MenuItem onClick={handleGymClose} component="a" href="/gym/recommended">
                        Recommended Machines
                    </MenuItem>
                    <MenuItem onClick={handleGymClose} component="a" href="/gym/buddy">
                        Gym Buddy
                    </MenuItem>
                </Menu>

                <Button
                    style={{
                        textTransform: 'none',
                        fontSize: '1.25rem',
                        padding: '12px 24px',
                        minWidth: '120px'
                    }}
                    variant="text"
                    href="/settings"
                >
                    Settings
                </Button>
                <Button
                    style={{
                        textTransform: 'none',
                        fontSize: '1.25rem',
                        padding: '12px 24px',
                        minWidth: '120px'
                    }}
                    variant="text"
                    href="/"
                >
                    Log Out
                </Button>
            </Box>
            <Divider />
        </Box>

    );
}