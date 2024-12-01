import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Import useTheme

export default function NavBar() {
    const theme = useTheme(); // Access the current theme

    const [gymAnchorEl, setGymAnchorEl] = useState(null);
    const open = Boolean(gymAnchorEl);

    const handleGymClick = (event) => {
        setGymAnchorEl(event.currentTarget);
    };

    const handleGymClose = () => {
        setGymAnchorEl(null);
    };

    const navigate = useNavigate();

    return (
        <Box>
            <Box display="flex" alignItems="center">
                <Button
                    style={{
                        textTransform: 'none',
                        fontSize: '1.25rem',
                        padding: '12px 24px',
                        minWidth: '120px',
                        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
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
                        marginLeft: 'auto'
                    }}
                    variant="contained"
                    href="/buddy"
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
                    href="/matches"
                >
                    Your Matches
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
                    onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('loginAlertShown');
                        navigate('/');
                    }}
                >
                    Log Out
                </Button>
            </Box>
            <Divider />
        </Box>
    );
}