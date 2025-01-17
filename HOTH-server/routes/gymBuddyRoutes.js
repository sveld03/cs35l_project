const express = require('express')
const {
  upsertGymBuddyProfile,
  getGymBuddyPublicProfile,
  matchGymBuddies,
  likeGymBuddy,
  dislikeGymBuddy,
  getMyBuddies,
  getNotifications,
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
router.patch('/like/:id', verifyToken, likeGymBuddy)

// dislike functionality (add to dislikes array) and return success/failure message
router.patch('/dislike/:id', verifyToken, dislikeGymBuddy)

// get all successful matches for given user (both buddies liked each other)
router.get('/getMyBuddies',verifyToken, getMyBuddies)

// get all notifications for a user
router.get('/getNotifications',verifyToken, getNotifications)


module.exports = router


