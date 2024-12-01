const express = require('express')
const {
  upsertGymBuddyProfile,
  getGymBuddyPublicProfile,
  matchGymBuddies,
  likeGymBuddy,
  dislikeGymBuddy,
  getMyBuddies,
} = require("../controllers/gymBuddyController.js");

const{
  verifyToken
} = require("../controllers/authController.js")

const router = express.Router()

// update gym buddy profile
router.patch('/update', verifyToken, upsertGymBuddyProfile)

// get gym buddy info
router.get('/getProfile', verifyToken, getGymBuddyPublicProfile)

// performs matching algo to calculate top 5 matches, add to matches array, and return matches
router.patch('/match', verifyToken, matchGymBuddies)

// like functionality (add to likes array) and return success/failure message
router.patch('/like', verifyToken, likeGymBuddy)

// dislike functionality (add to dislikes array) and return success/failure message
router.patch('/dislike', verifyToken, dislikeGymBuddy)

// get all successful matches for given user (both buddies liked each other)
router.get('/getMyBuddies',verifyToken, getMyBuddies)

module.exports = router


