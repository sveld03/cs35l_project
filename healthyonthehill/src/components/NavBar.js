import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function NavBar() {
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
                    href="/gym"
                >
                    Gym
                </Button>

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