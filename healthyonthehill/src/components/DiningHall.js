import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function DiningHall({ name, stars = 0, status, hour, activity, highlight }) {
    const [open, setOpen] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState("");

    const isOpen = status === "O";
    const isClosed = status === "L";

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        console.log("Dining Hall:", name.match(/[A-Z][a-z]+/g).join(" "));
        console.log("User Rating:", userRating);
        console.log("Comment:", comment);
        handleClose();
    };

    return (
        <Box
            sx={{
                padding: 2,
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                backgroundColor: 'background.paper',
                boxShadow: 1
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
            >
                <Link
                    href={`http://menu.dining.ucla.edu/Menus/${name}`}
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                >
                    {name.match(/[A-Z][a-z]+/g).join(" ")}
                </Link>

                <Box display="flex" alignItems="center">
                    <Rating size="small" name={`${name} Rating`} value={stars} readOnly sx={{ mr: 1 }} />
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={handleOpen}
                        sx={{
                            textTransform: 'none',
                            fontSize: '0.75rem',
                            borderRadius: '16px'
                        }}
                    >
                        Rate it!
                    </Button>
                </Box>
            </Box>

            <Typography
                variant="body2"
                color={isOpen ? "green" : "textSecondary"}
                sx={{
                    fontSize: '0.875rem',
                    mb: 1,
                    fontWeight: isOpen ? 'bold' : 'regular'
                }}
            >
                {isOpen ? `Open until ${hour}` : isClosed ? `Opens at ${hour}` : 'Closed'}
                {isOpen && activity && ` | Activity: ${activity}%`}
            </Typography>

            {highlight && (
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                        fontSize: '0.875rem',
                        mb: 1,
                        fontStyle: 'italic'
                    }}
                >
                    {highlight}
                </Typography>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Rate {name.match(/[A-Z][a-z]+/g).join(" ")}</DialogTitle>
                <DialogContent>
                    <Rating
                        name="user-rating"
                        value={userRating}
                        onChange={(event, newValue) => setUserRating(newValue)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
