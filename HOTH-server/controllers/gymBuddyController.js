const User = require("../model/user");
const mongoose = require("mongoose");

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
    const user = await User.findById(req.userId);
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
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "Internal serer error" });
    }
  }
};

const getGymBuddyPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.gymBuddy || !user.gymBuddy.isGymBuddy) {
      return res.status(404).json({ error: "Valid gym buddy user not found" });
    }

    // Select public profile items only
    const gymBuddyPubProfile = {
      fitnessLevel: user.gymBuddy.fitnessLevel,
      goal: user.gymBuddy.goal,
      availability: user.gymBuddy.availability,
      gymPreference: user.gymBuddy.gymPreference,
      motivationStyle: user.gymBuddy.motivationStyle,
      buddyPreferences: user.gymBuddy.buddyPreferences,
    };

    return res.status(200).json(gymBuddyPubProfile);
  } catch (err) {
    console.error("Error fetching public profile:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getGymBuddyUsers = async () => {
  try {
    return await User.find({ "gymBuddy.isGymBuddy": true });
  } catch (err) {
    throw new Error("Failed to fetch gym buddy users");
  }
};

const matchGymBuddies = async (req, res) => {
  try {
    const thisUser = await User.findById(req.userId);
    if (!thisUser || !thisUser.gymBuddy || !thisUser.gymBuddy.isGymBuddy) {
      return res
        .status(404)
        .json({ error: "User not found or not a gym buddy" });
    }

    const otherUsers = await getGymBuddyUsers();
    console.log("otherUsers", otherUsers)
    
    const scores = otherUsers
      .filter(
        (otherUser) => otherUser._id.toString() !== thisUser._id.toString()
      )
      .map((otherUser) => ({
        score: calculateCompatibilityScore(thisUser, otherUser),
        user: otherUser,
      }));

      console.log(scores)

    const topMatches = scores
      .sort((a, b) => b.score - a.score)
      .filter((match) => !thisUser.gymBuddy.matches.includes(match.user._id))
      .slice(0, 5);

    if (!topMatches.length) {
      return res.status(200).json({ message: "No matches found." });
    }

    // Batch update for matches
    const updates = topMatches.map((match) => ({
      updateOne: {
        filter: { _id: match.user._id },
        update: { $addToSet: { "gymBuddy.matches": thisUser._id } },
      },
    }));

    if (updates.length) {
      await User.bulkWrite(updates);
    }

    // Update the current user
    thisUser.gymBuddy.matches.push(
      ...topMatches.map((match) => match.user._id)
    );
    await thisUser.save();

    return res.status(200).json(topMatches.map((match) => match.user));
  } catch (err) {
    console.error("Error matching gym buddies:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// like gym Buddy - add gymBuddy id to likes and check if a successful match occurs
const likeGymBuddy = async (req, res) => {
  const { id } = req.params; // id param is of the person you like
  console.log("in the likeGymBuddies")
  try {
    const thisUser = await User.findById(req.userId);
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
    const thisUser = await User.findById(req.userId);
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
  const { id } = req.userId;
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
