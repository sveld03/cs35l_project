
const express = require('express');
const router = express.Router();
const { getUserRating, updateUserRating, getStars, getComments } = require('../controllers/diningRateController');

// Auth routes
router.get('/getUserRating/:diningHall', getUserRating);
router.put('/updateUserRating/:diningHall', updateUserRating);
router.get('/getStars/:diningHall', getStars);
router.get('/getComments/:diningHall', getComments);

module.exports = router;