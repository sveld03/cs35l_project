import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

export default function DiningHall({ name, stars = 0, status, hour, activity, highlight }) {
    const isOpen = status === "O";
    const isClosed = status === "L";

    return (
        <Box sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Box display="flex" alignItems="center" mb={1}>
                <Link
                    href={`http://menu.dining.ucla.edu/Menus/${name}`}
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="h6"
                    color="primary"
                    sx={{ mr: 1 }}
                >
                    {name.match(/[A-Z][a-z]+/g).join(" ")}
                </Link>
                <Rating size="small" name={`${name} Rating`} value={stars} readOnly />
            </Box>

            <Typography variant="body2" color={isOpen ? "green" : "textSecondary"} mb={2}>
                {isOpen ? `Open until ${hour}` : isClosed ? `Opens at ${hour}` : 'Closed'}
                {isOpen && activity && ` | ${activity}%`}
            </Typography>

            {highlight && (
                <Typography variant="body2" color="textSecondary" mb={2}>
                    {highlight}
                </Typography>
            )}

            <Button
                size="small"
                variant="contained"
                color="error"
                href="/buddy"
                sx={{ textTransform: 'none' }}
            >
                Rate it!
            </Button>
        </Box>
    );
}
