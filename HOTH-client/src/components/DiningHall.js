import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DiningHall({
  name,
  status,
  hour,
  activity,
  highlight,
}) {
  const [open, setOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [averageStars, setAverageStars] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);

  const isOpen = status === "O";
  const isClosed = status === "L";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchComments = useCallback(async () => {
    setCommentsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/ratings/getComments/${name}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  }, [name]);

  const fetchAverageRating = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/ratings/getStars/${name}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch average rating");
      }

      const data = await response.json();
      setAverageStars(parseFloat(data.averageStars));
    } catch (error) {
      console.error("Error fetching average rating:", error);
      setAverageStars(null);
    }
  }, [name]);

  const fetchMenu = useCallback(async () => {
    if (!menuExpanded) return;

    setMenuLoading(true);
    try {
      const response = await fetch(`http://localhost:1338/menu/${name}`);
      const data = await response.json();
      setMenuItems(data); // Store full response to handle meal periods
    } catch (error) {
      console.error("Error fetching menu:", error);
      setMenuItems({});
    } finally {
      setMenuLoading(false);
    }
  }, [name, menuExpanded]);

  const fetchRating = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/ratings/getUserRating/${name}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch rating");
      }

      const data = await response.json();
      setUserRating(data.stars || 0);
      setComment(data.comment || "");
    } catch (error) {
      console.error("Error fetching dining hall rating:", error);
    }
  }, [name]);

  useEffect(() => {
    if (open) {
      fetchRating();
    }

    if (name) {
      fetchAverageRating();
      fetchComments();
    }
  }, [open, name, fetchAverageRating, fetchComments, fetchRating]);

  useEffect(() => {
    if (menuExpanded) {
      fetchMenu();
    }
  }, [menuExpanded, fetchMenu]);

  const updateRating = async (diningHallName, stars, comment) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/ratings/updateUserRating/${diningHallName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            stars,
            comment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update rating: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating rating:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      const data = await updateRating(name, userRating, comment);
      console.log("Rating updated successfully:", data);

      setSnackbarMessage("Rating submitted successfully!");
      setSnackbarOpen(true);
      handleClose();
      setUserRating(0);
      setComment("");
      fetchAverageRating();
      fetchComments();
    } catch (error) {
      setSnackbarMessage("Failed to submit rating. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "background.paper",
        boxShadow: 1,
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
          sx={{ fontWeight: "bold", fontSize: "1rem" }}
        >
          {name
            .replace("Drey", "The Drey")
            .match(/[A-Z][a-z]+|\d+|(\b\w+\b(\s+\w+){2})/g)
            .join(" ")}
        </Link>

        <Box display="flex" alignItems="center">
          <Rating
            size="small"
            name={`${name} Rating`}
            value={averageStars || 0}
            readOnly
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
            {averageStars ? `(${averageStars.toFixed(1)})` : "No ratings"}
          </Typography>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleOpen}
            sx={{
              textTransform: "none",
              fontSize: "0.75rem",
              borderRadius: "16px",
            }}
          >
            Rate it!
          </Button>
        </Box>
      </Box>

      <Typography
        variant="body2"
        color={isOpen ? "green" : isClosed ? "red" : "textSecondary"}
        sx={{
          fontSize: "0.875rem",
          mb: 1,
          fontWeight: "bold",
        }}
      >
        {isOpen
          ? `Open until ${hour}`
          : isClosed
          ? `Opens at ${hour}`
          : "Closed"}
        {isOpen && activity && ` | Activity: ${activity}%`}
      </Typography>

      {(isOpen || isClosed) && (
        <Accordion
          expanded={menuExpanded}
          onChange={() => setMenuExpanded(!menuExpanded)}
          sx={{
            "&:before": {
              display: "none",
            },
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                fontSize: "0.875rem",
                fontWeight: "bold",
              }}
            >
              Featured Menu Items
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {menuLoading ? (
              <Typography variant="body2">Loading menu...</Typography>
            ) : menuItems ? (
              <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                {/* Handle simple menu items first */}
                {menuItems.items?.length > 0 &&
                  menuItems.items.map((item, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        mb: 0.5,
                        fontSize: "0.875rem",
                        color: "text.secondary",
                      }}
                    >
                      • {item}
                    </Typography>
                  ))}

                {/* Handle meal-specific menus */}
                {menuItems?.Breakfast?.items?.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", mt: 1 }}
                    >
                      Breakfast
                    </Typography>
                    {menuItems.Breakfast.items.map((item, index) => (
                      <Typography
                        key={`breakfast-${index}`}
                        variant="body2"
                        sx={{
                          ml: 2,
                          mb: 0.5,
                          fontSize: "0.875rem",
                          color: "text.secondary",
                        }}
                      >
                        • {item}
                      </Typography>
                    ))}
                  </>
                )}

                {menuItems?.Lunch?.items?.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", mt: 1 }}
                    >
                      Lunch
                    </Typography>
                    {menuItems.Lunch.items.map((item, index) => (
                      <Typography
                        key={`lunch-${index}`}
                        variant="body2"
                        sx={{
                          ml: 2,
                          mb: 0.5,
                          fontSize: "0.875rem",
                          color: "text.secondary",
                        }}
                      >
                        • {item}
                      </Typography>
                    ))}
                  </>
                )}

                {menuItems?.Dinner?.items?.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", mt: 1 }}
                    >
                      Dinner
                    </Typography>
                    {menuItems.Dinner.items.map((item, index) => (
                      <Typography
                        key={`dinner-${index}`}
                        variant="body2"
                        sx={{
                          ml: 2,
                          mb: 0.5,
                          fontSize: "0.875rem",
                          color: "text.secondary",
                        }}
                      >
                        • {item}
                      </Typography>
                    ))}
                  </>
                )}

                {!menuItems.items?.length &&
                  !menuItems.Breakfast?.items?.length &&
                  !menuItems.Lunch?.items?.length &&
                  !menuItems.Dinner?.items?.length && (
                    <Typography variant="body2">
                      No menu items available.
                    </Typography>
                  )}
              </Box>
            ) : (
              <Typography variant="body2">No menu items available.</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      )}

      {comments.length > 0 ? (
        <Accordion
          sx={{
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={fetchComments}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                fontSize: "0.875rem",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              What other people think of{" "}
              {name
                .replace("Drey", "The Drey")
                .match(/[A-Z][a-z]+|\d+|(\b\w+\b(\s+\w+){2})/g)
                .join(" ")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {commentsLoading ? (
              <Typography>Loading comments...</Typography>
            ) : comments.length > 0 ? (
              comments.map((c, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 1 }}
                >
                  <strong>{c.name}:</strong> {c.comment}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                No comments available.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No comments available.
        </Typography>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Rate{" "}
          {name
            .replace("Drey", "The Drey")
            .match(/[A-Z][a-z]+|\d+|(\b\w+\b(\s+\w+){2})/g)
            .join(" ")}
        </DialogTitle>
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
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={userRating === 0 || userRating === null}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
}
