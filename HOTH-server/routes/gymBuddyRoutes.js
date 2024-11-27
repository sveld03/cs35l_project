const express = require('express')
const {
  upsertGymBuddyProfile,
  getGymBuddyPublicProfile,
  matchGymBuddies,
  likeGymBuddy,
  dislikeGymBuddy,
  getMyBuddies,
} = require("../controllers/gymBuddyController.js");

const router = express.Router()

// update gym buddy profile
router.patch('/update', upsertGymBuddyProfile)

// get gym buddy info
router.get('/getProfile/:id', getGymBuddyPublicProfile)

// performs matching algo to calculate top 5 matches, add to matches array, and return matches
router.patch('/match/:id', matchGymBuddies)

// like functionality (add to likes array) and return success/failure message
router.patch('/like/:id', likeGymBuddy)

// dislike functionality (add to dislikes array) and return success/failure message
router.patch('/dislike', dislikeGymBuddy)

// get all successful matches for given user (both buddies liked each other)
router.get('/getMyBuddies/:id', getMyBuddies)

module.exports = router


