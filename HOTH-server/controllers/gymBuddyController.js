const User = require("../model/user");
const mongoose = require("mongoose");
const { notify } = require("../routes/authRoutes");

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
    console.log("otherUsers", otherUsers);

    const scores = otherUsers
      .filter(
        (otherUser) => otherUser._id.toString() !== thisUser._id.toString()
      )
      .map((otherUser) => ({
        score: calculateCompatibilityScore(thisUser, otherUser),
        user: otherUser,
      }));

    console.log(scores);

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
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addNotification = async (user, notif) => {
  try {
    user.gymBuddy.notifications.push({ message: notif, date: new Date() });
    user.markModified("gymBuddy");
    await user.save();
  } catch (err) {
    console.error(`Failed to add notification for user ${user._id}:`, err);
    throw err;
  }
};

const likeGymBuddy = async (req, res) => {
  const { id } = req.params; // id param is of the person you like
  console.log("in the likeGymBuddies");
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

    // Check if a successful match occurs
    if (isMutualLike(thisUser, targetUser)) {
      console.log("in the mutual like");
      thisUser.gymBuddy.successfulMatches.push(targetUser._id);
      targetUser.gymBuddy.successfulMatches.push(thisUser._id);
      await addNotification(
        thisUser,
        `You and ${targetUser.name} are a match! Both of you liked each other.`
      );
      await addNotification(
        targetUser,
        `You and ${thisUser.name} are a match! Both of you liked each other.`
      );

      return res
        .status(200)
        .json({ message: "Gym buddy liked and successful match :)" });
    }
    return res.status(200).json({ message: "Gym buddy liked" });
  } catch (err) {
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
    return res.status(500).json({ error: "Internal server error" });
  }
};

// // get all successful matches (both users like each other)
// const getMyBuddies = async (req, res) => {
//   const { id } = req.userId;
//   try {
//     const user = await User.findById(id);
//     const matches = await Promise.all( // use promise.all to ensure each match is loaded before returning matches
//       user.gymBuddy.successfulMatches.map(async (matchId) => {
//         let match = await User.findById(matchId);
//         return {
//           name: match.name,
//           // preferredContactType: match.contact.preferredContactMethod,
//           email: match.email,
//           // insta: match.insta,
//           // phone: match.contact.phoneNumber
//         };
//       })
//     );
//     return res.status(200).json({ matches });
//   } catch (err) {
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// get all successful matches (both users like each other)
const getMyBuddies = async (req, res) => {
  const { id } = req.userId; // Get the user's ID from the request
  try {
    // Find the user by their ID
    const user = await User.findById(id);
    if (!user) {
      console.error(`User with id ${id} not found`);
      return res.status(404).json({ error: "User not found" });
    }

    // Use Promise.all to ensure all match data is loaded before returning
    const matches = await Promise.all(
      user.gymBuddy.successfulMatches.map(async (matchId) => {
        try {
          // Fetch each match based on the matchId
          let match = await User.findById(matchId);
          if (!match) {
            console.error(`Match with id ${matchId} not found`);
            return null; // or continue depending on how you want to handle missing matches
          }

          // Return the desired match data
          return {
            name: match.name,
            preferredContactType: match.contact.preferredContactMethod,
            email: match.email,
            insta: match.insta,
            phone: match.contact.phoneNumber
          };
        } catch (err) {
          console.error(`Error fetching match ${matchId}:`, err);
          return null; // Continue processing other matches even if one fails
        }
      })
    );

    // Remove null values from the matches array (in case any match wasn't found)
    const validMatches = matches.filter((match) => match !== null);

    // Send the successful matches as a response
    return res.status(200).json({ matches: validMatches });
  } catch (err) {
    // Log the error with a more descriptive message
    console.error("Error in getMyBuddies:", err);
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
