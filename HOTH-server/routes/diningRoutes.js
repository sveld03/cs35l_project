const express = require('express')
const {
    getUserRatingForDiningHall,
    updateRatingForDiningHall,
    getRatingForDiningHall,
    getCommentsForDiningHall
} = require("../controllers/diningRateController.js");

const{
  verifyToken
} = require("../controllers/authController.js")

const router = express.Router()

router.get('/getUserRating/:dininghall', verifyToken, getUserRatingForDiningHall)

router.patch('/updateUserRating/:dininghall', verifyToken, updateRatingForDiningHall)

router.get('/getDiningHallRating/:dininghall', getRatingForDiningHall)

router.get('/getDiningHallComments/:dininghall', getCommentsForDiningHall)

module.exports = router
