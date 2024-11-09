import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';


export default function DiningHall({ name, stars = 0, status, hour, activity, highlight }) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                <Link
                    href={`http://menu.dining.ucla.edu/Menus/${name}`}
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {name.match(/[A-Z][a-z]+/g).join(" ")}
                </Link>
                <Rating size="small" name={`${name} Rating`} value={stars} readOnly />
                {status === "O" ? `${activity}%` : ""}
                <Typography variant="h10" gutterBottom>
                    {(status === "O") ? `Open until ${hour}` : (status === "L") ? `Opens at ${hour}` : ""}
                </Typography>

            </Typography>
            <Typography variant="h20" gutterBottom>
                {(highlight) ? `${highlight}` : ""}
            </Typography>

        </Box>
    );
}

