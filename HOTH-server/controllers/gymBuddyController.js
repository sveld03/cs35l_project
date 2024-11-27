const User = require("../model/user");
const mongoose = require("mongoose");
const { getGymBuddyUsers } = require("./userController");

// Helper to check if mutual like occurs
const isMutualLike = (thisUser, otherUser) => {
  if (!thisUser.gymBuddy || !otherUser.gymBuddy) {
    return false;
  }
  return (
    thisUser.gymBuddy.likes.includes(otherUser._id.toString()) &&
    otherUser.gymBuddy.likes.includes(thisUser._id.toString())
  );
};

// Helper to check if mutual dislike occurs
const isMutualDislike = (thisUser, otherUser) => {
  if (!thisUser.gymBuddy || !otherUser.gymBuddy) {
    return false;
  }
  return (
    thisUser.gymBuddy.dislikes.includes(otherUser._id.toString()) &&
    otherUser.gymBuddy.dislikes.includes(thisUser._id.toString())
  );
};

// Helper: Calculate compatibility score
const calculateCompatibilityScore = (thisUser, otherUser) => {
  let score = 0;

  if (
    thisUser.gymBuddy.buddyPreferences.preferredGender === otherUser.gender ||
    thisUser.gymBuddy.buddyPreferences.preferredGender ===
      "Prefer not to disclose"
  ) {
    score += 10;
  }
  if (thisUser.gymBuddy.fitnessLevel === otherUser.gymBuddy.fitnessLevel) {
    score += 10;
  }
  if (
    thisUser.gymBuddy.buddyPreferences.motivationStyle ===
    otherUser.gymBuddy.motivationStyle
  ) {
    score += 15;
  }
  if (thisUser.gymBuddy.goal === otherUser.gymBuddy.goal) {
    score += 15;
  }
  if (thisUser.gymBuddy.gymPreference === otherUser.gymBuddy.gymPreference) {
    score += 5;
  }

  const commonAvailability = thisUser.gymBuddy.availability.filter((a1) =>
    otherUser.gymBuddy.availability.some(
      (a2) => a1.day === a2.day && a1.times.some((t) => a2.times.includes(t))
    )
  );
  score += commonAvailability.length * 5;

  return score;
};

// Update or insert a gym buddy profile
const upsertGymBuddyProfile = async (req, res) => {
  const {
    fitnessLevel,
    goal,
    availability,
    gymPreference,
    motivationStyle,
    buddyPreferences,
    contact,
  } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.gymBuddy = {
      isGymBuddy: true,
      fitnessLevel,
      goal,
      availability,
      gymPreference,
      motivationStyle,
      buddyPreferences,
      contact,
    };

    await user.save();
    return res.status(200).json({ message: "Gym buddy profile upserted" });
  } catch (err) {
    console.error("Error updating gym buddy profile:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get the public profile of a gym buddy (likes/dislikes are hidden because of the toJSON transformation in schema)
const getGymBuddyPublicProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id).select(
      "gymBuddy.fitnessLevel gymBuddy.goal gymBuddy.availability gymBuddy.gymPreference gymBuddy.motivationStyle gymBuddy.buddyPreferences"
    );

    if (!user || !user.gymBuddy.isGymBuddy) {
      return res.status(404).json({ error: "Valid gym buddy user not found" });
    }

    return res.status(200).json(user.gymBuddy);
  } catch (err) {
    console.error("Error fetching public profile:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Match users based on preferences
const matchGymBuddies = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const thisUser = await User.findById(id);
    if (!thisUser || !thisUser.gymBuddy.isGymBuddy) {
      return res
        .status(404)
        .json({ error: "User not found or not a gym buddy" });
    }

    const otherUsers = await getGymBuddyUsers();
    const scores = otherUsers
      .filter(
        (otherUser) =>
          otherUser.gymBuddy.isGymBuddy &&
          otherUser._id.toString() !== thisUser._id.toString()
      )
      .map((otherUser) => ({
        score: calculateCompatibilityScore(thisUser, otherUser),
        userId: otherUser._id,
      }));

    const sortedScores = scores.sort((a, b) => b.score - a.score);

    // Sort and take top 5 matches (if possible)
    let count = 0;
    let i = 0;
    let topMatches = [];
    while (count < 5 && i < sortedScores.length) {
      if (!thisUser.gymBuddy.matches.includes(sortedScores[i].userId)) {
        topMatches.push(sortedScores[i]);
        count++;
      }
      i++;
    }

    // Update matches for both users
    const matchUpdates = topMatches.map(async (matchId) => {
      const match = await User.findById(matchId);

      if (!thisUser.gymBuddy.matches.includes(matchId)) {
        thisUser.gymBuddy.matches.push(matchId);
      }
      if (!match.gymBuddy.matches.includes(thisUser._id)) {
        match.gymBuddy.matches.push(thisUser._id);
        await match.save();
      }
    });

    await Promise.all([...matchUpdates, thisUser.save()]); // run parallely to improve efficiency

    return res.status(200).json(topMatches);
  } catch (err) {
    console.error("Error matching gym buddies:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// like gym Buddy - add gymBuddy id to likes and check if a successful match occurs
const likeGymBuddy = async (req, res) => {
  const { id } = req.params;

  try {
    const thisUser = await User.findById(req.user.id);
    const targetUser = await User.findById(id);
    if (!thisUser || !targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (thisUser.gymBuddy.likes.includes(id)) {
      return res.status(400).json({ error: "You already liked this user" });
    }

    thisUser.gymBuddy.likes.push(id);
    await thisUser.save();

    // check if a successful match occurs
    if (isMutualLike(thisUser, targetUser)) {
      await addNotification(
        thisUser,
        `You and ${targetUser.name} are a match! Both of you liked each other.`
      );
      await addNotification(
        targetUser,
        `You and ${thisUser.name} are a match! Both of you liked each other.`
      );
      await thisUser.save();
      await targetUser.save();
      return res
        .status(200)
        .json({ message: "Gym buddy liked and successful match :)" });
    }
    return res.status(200).json({ message: "Gym buddy liked" });
  } catch (err) {
    console.error("Error liking gym buddy:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// dislike a gym buddy
const dislikeGymBuddy = async (req, res) => {
  const { id } = req.params;

  try {
    const thisUser = await User.findById(req.user.id);
    const targetUser = await User.findById(id);
    if (!thisUser || !targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (thisUser.gymBuddy.dislikes.includes(id)) {
      return res.status(400).json({ error: "You already disliked this user" });
    }

    thisUser.gymBuddy.dislikes.push(id);
    await thisUser.save();

    return res.status(200).json({ message: "Gym buddy disliked" });
  } catch (err) {
    console.error("Error disliking gym buddy:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// get all successful matches (both users like each other)
const getMyBuddies = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId(id)) {
    return res.status(404).json({ error: "Could not find user" });
  }

  try {
    const user = await User.findById(id).select("gymBuddy.matches");

    if (!user || !user.gymBuddy.matches.length) {
      return res.status(404).json({ error: "No matches found" });
    }

    const matches = await User.find({ _id: { $in: user.gymBuddy.matches } })
      .select("name gymBuddy")
      .lean();

    return res.status(200).json({ matches });
  } catch (err) {
    console.error("Error fetching gym buddies:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  upsertGymBuddyProfile,
  getGymBuddyPublicProfile,
  matchGymBuddies,
  likeGymBuddy,
  dislikeGymBuddy,
  getMyBuddies,
};
