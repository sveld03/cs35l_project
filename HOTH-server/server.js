const express = require("express");
const User = require("./model/user.js");
require("dotenv").config();
mongoose = require("mongoose");
const users = require("./routes/users.js") // to get routes

const app = express();


// any data we send to server accessible in req.body
app.use(express.json())

// logging the http requests made for debugging
app.use((req, res, next) => {
  console.log(req.path, req.method) 
  next()
})

app.use("/api/users", users)


// connecting to mongodb atlas db
mongoose
  .connect(process.env.URI)
  .then(
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to db & listening for requests on port",
        process.env.PORT
      );
    })
  )
  .catch((err) => console.log(err));

























// matching algorithm

async function matchUsers() {
  try {
    const users = await User.find({});

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

    const matches = users.map((user) => {
      const userMatches = users
        .filter(
          (potentialMatch) =>
            potentialMatch._id.toString() !== user._id.toString()
        )
        .map((potentialMatch) => ({
          user: potentialMatch,
          score: calculateCompatibilityScore(user, potentialMatch),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5); // Get top 5 matches

      return {
        user: user,
        matches: userMatches,
      };
    });

    matches.forEach((match) => {
      console.log(`Matches for ${match.user.name}:`);
      match.matches.forEach((m) => {
        console.log(`- ${m.user.name} (Score: ${m.score})`);
      });
      console.log("---");
    });
  } catch (error) {
    console.error("Error matching users:", error);
  }
}

// Run the matching algorithm
matchUsers();
