const User = require("../model/user");
const { getUsers } = require("./userController");

// Update a single gym buddy profile (fitnessLevel, goal, availability, etc.)
const upsertGymBuddyProfile = async (req, res) => {
  const {
    fitnessLevel,
    goal,
    availability,
    gymPreference,
    motivationStyle,
    BuddyPreferences,
    Contact,
  } = req.body;

  try {
    const user = await User.findById(req.user.id); // assuming authenticated
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.gymBuddy.fitnessLevel = fitnessLevel;
    user.gymBuddy.goal = goal;
    user.gymBuddy.availability = availability;
    user.gymBuddy.gymPreference = gymPreference;
    user.gymBuddy.motivationStyle = motivationStyle;
    user.gymBuddy.BuddyPreferences = BuddyPreferences;
    user.gymBuddy.isGymBuddy = true;
    user.gymBuddy.Contact = Contact;

    await user.save();
    res.status(200).json({ message: "Gym buddy profile updated" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getGymBuddyProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
    return res
      .status(200)
      .json({
        fitnessLevel: user.gymBuddy.fitnessLevel,
        goal: user.gymBudy.goal,
        availability: user.gymBuddy.availability,
        gymPreference: user.gymBuddy.gymPreference,
        motivationStyle: gymBuddy.motivationStyle,
        BuddyPreferences: gymBuddy.BuddyPreferences,
        Contact: user.gymBuddy.Contact,
      });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Match users based on preferences
const matchGymBuddies = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
  const thisUser = await User.findById(id);

  // matching algorithm
  if (!isGymBuddy) {
    res
      .status(400)
      .json({ error: "User is not registered to recieve gym buddy matches" });
  }

    function calculateCompatibilityScore(user1, user2) {
            let score = 0;
            if (
              user1.BuddyPreferences.preferredGender === user2.gender ||
              user1.BuddyPreferences.preferredGender === "Prefer not to disclose"
            ) {
              score += 10;
            }
            if (
              user1.BuddyPreferences.preferredFitnessLevel === user2.fitnessLevel ||
              user1.BuddyPreferences.preferredFitnessLevel === "No Preference"
            ) {
              score += 10;
            }
            if (user1.BuddyPreferences.motivationStyle === user2.motivationStyle) {
              score += 10;
            }
      
            if (user1.goals == user2.goals){
              score +=  5;
            }
      
            if (user1.gymPreference == user2.gymPreference){
              score +=  5;
            }
      
            const commonAvailability = user1.availability.filter((a1) =>
              user2.availability.some(
                (a2) =>
                  a1.day === a2.day && a1.times.some((t) => a2.times.includes(t))
              )
            );
            score += commonAvailability.length * 5;
      
            return score;
          }
    users = getUsers()
    scores = []
    users.forEach(user => {
      if(user.isGymBuddy && user._id != thisUser._id){
        score = calculateCompatibilityScore(user, thisUser)
        scores.append((score, user)) // use heap structure later or divide/conquer algo to get top 5 users with largest scores TO DO
      }
    });
};

module.exports = { upsertGymBuddyProfile, getGymBuddyProfile, matchGymBuddies};