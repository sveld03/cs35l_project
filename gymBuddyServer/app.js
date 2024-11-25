const mongoose = require("./db");
const User = require("./buddyModel/user.js");

// creating new users
const users = [
  new User({
    name: "Alex Johnson",
    age: 22,
    gender: "Non-binary",
    email: "alex.j@example.com",
    phoneNumber: "310-555-1234",
    Insta: "alexfit22",
    preferredContactMethod: "Insta",
    fitnessLevel: "Intermediate",
    goal: ["Muscle Gain", "Flexibility"],
    availability: [
      { day: "Monday", times: ["Evening"] },
      { day: "Wednesday", times: ["Afternoon"] },
    ],
    gymPreference: ["BFit"],
    motivationStyle: "Competitive",
    BuddyPreferences: {
      preferredGender: "Prefer not to disclose",
      preferredFitnessLevel: "Intermediate",
      motivationStyle: "Competitive",
    },
    bio: "Fitness enthusiast looking to build strength and flexibility!",
    profilePicture: "http://example.com/alex_profile.jpg",
  }),

  new User({
    name: "Samantha Lee",
    age: 28,
    gender: "Female",
    email: "sam.lee@example.com",
    phoneNumber: "213-555-5678",
    Insta: "samlee_fit",
    preferredContactMethod: "Email",
    fitnessLevel: "Advanced",
    goal: ["Cardiovascular Endurance", "Weight Loss"],
    availability: [
      { day: "Wednesday", times: ["Morning"] },
      { day: "Saturday", times: ["Afternoon"] },
    ],
    gymPreference: ["Wooden", "BFit"],
    motivationStyle: "Supportive",
    BuddyPreferences: {
      preferredGender: "Female",
      preferredFitnessLevel: "Intermediate",
      motivationStyle: "Supportive",
    },
    bio: "Marathon runner and yoga enthusiast. Let's push our limits together!",
    profilePicture: "http://example.com/samantha_profile.jpg",
  }),

  new User({
    name: "Michael Chen",
    age: 19,
    gender: "Male",
    email: "mike.chen@example.com",
    phoneNumber: "424-555-9876",
    Insta: "mike_lifts",
    preferredContactMethod: "Phone",
    fitnessLevel: "Beginner",
    goal: ["Muscle Gain"],
    availability: [
      { day: "Tuesday", times: ["Afternoon"] },
      { day: "Thursday", times: ["Evening"] },
    ],
    gymPreference: ["Wooden"],
    motivationStyle: "Flexible",
    BuddyPreferences: {
      preferredGender: "Male",
      preferredFitnessLevel: "Beginner",
      motivationStyle: "Supportive",
    },
    bio: "New to weightlifting and excited to learn!",
    profilePicture: "http://example.com/michael_profile.jpg",
  }),

  new User({
    name: "Emily Rodriguez",
    age: 31,
    gender: "Female",
    email: "emily.r@example.com",
    phoneNumber: "818-555-3456",
    Insta: "emilyfit31",
    preferredContactMethod: "Email",
    fitnessLevel: "Intermediate",
    goal: ["Weight Loss", "Flexibility"],
    availability: [
      { day: "Monday", times: ["Evening"] },
      { day: "Friday", times: ["Evening"] },
    ],
    gymPreference: ["BFit"],
    motivationStyle: "Supportive",
    BuddyPreferences: {
      preferredGender: "Prefer not to disclose",
      preferredFitnessLevel: "No Preference",
      motivationStyle: "Flexible",
    },
    bio: "Balancing fitness with a busy work schedule. Looking for motivation!",
    profilePicture: "http://example.com/emily_profile.jpg",
  }),

  new User({
    name: "Jordan Taylor",
    age: "25",
    gender: "Transgender",
    email: "jordan.t@example.com",
    phoneNumber: "323-555-7890",
    Insta: "jord_fit",
    preferredContactMethod: "Insta",
    fitnessLevel: "Advanced",
    goal: ["Muscle Gain", "Cardiovascular Endurance"],
    availability: [
      { day: "Saturday", times: ["Morning", "Afternoon"] },
      { day: "Sunday", times: ["Morning"] },
    ],
    gymPreference: ["Wooden", "BFit"],
    motivationStyle: "Competitive",
    BuddyPreferences: {
      preferredGender: "Non-binary",
      preferredFitnessLevel: "Advanced",
      motivationStyle: "Competitive",
    },
    bio: "Crossfit enthusiast and powerlifter. Always pushing boundaries!",
    profilePicture: "http://example.com/jordan_profile.jpg",
  }),

  new User({
    name: "Olivia Kim",
    age: "20",
    gender: "Female",
    email: "olivia.k@example.com",
    phoneNumber: "626-555-2345",
    Insta: "livkim_fitness",
    preferredContactMethod: "Phone",
    fitnessLevel: "Beginner",
    goal: ["Weight Loss", "Flexibility"],
    availability: [{ day: "Sunday", times: ["Morning"] }],
    gymPreference: ["BFit"],
    motivationStyle: "Supportive",
    BuddyPreferences: {
      preferredGender: "Female",
      preferredFitnessLevel: "Beginner",
      motivationStyle: "Supportive",
    },
    bio: "Just starting my fitness journey. Looking for a supportive community!",
    profilePicture: "http://example.com/olivia_profile.jpg",
  }),

  new User({
    name: "Aiden Patel",
    age: "27",
    gender: "Male",
    email: "aiden.p@example.com",
    phoneNumber: "310-555-8765",
    Insta: "@aiden_gains",
    preferredContactMethod: "Email",
    fitnessLevel: "Intermediate",
    goal: ["Muscle Gain", "Cardiovascular Endurance"],
    availability: [
      { day: "Thursday", times: ["Evening"] },
      { day: "Saturday", times: ["Morning"] },
    ],
    gymPreference: ["Wooden"],
    motivationStyle: "Flexible",
    BuddyPreferences: {
      preferredGender: "Prefer not to disclose",
      preferredFitnessLevel: "Intermediate",
      motivationStyle: "Flexible",
    },
    bio: "Software engineer by day, fitness enthusiast by night. Let's code some gains!",
    profilePicture: "http://example.com/aiden_profile.jpg",
  }),

  new User({
    name: "Zoe Martinez",
    age: "33",
    gender: "Non-binary",
    email: "zoe.m@example.com",
    phoneNumber: "213-555-4321",
    Insta: "@zoe_fit_life",
    preferredContactMethod: "Insta",
    fitnessLevel: "Advanced",
    goal: ["Flexibility", "Cardiovascular Endurance"],
    availability: [
      { day: "Monday", times: ["Morning"] },
      { day: "Wednesday", times: ["Evening"] },
    ],
    gymPreference: ["BFit", "Wooden"],
    motivationStyle: "Competitive",
    BuddyPreferences: {
      preferredGender: "Non-binary",
      preferredFitnessLevel: "Advanced",
      motivationStyle: "Competitive",
    },
    bio: "Yoga instructor and marathon runner. Always up for a challenge!",
    profilePicture: "http://example.com/zoe_profile.jpg",
  }),

  new User({
    name: "Liam O'Connor",
    age: "23",
    gender: "Male",
    email: "liam.oc@example.com",
    phoneNumber: "818-555-9876",
    Insta: "@liam_lifts",
    preferredContactMethod: "Phone",
    fitnessLevel: "Intermediate",
    goal: ["Muscle Gain", "Weight Loss"],
    availability: [
      { day: "Wednesday", times: ["Evening"] },
      { day: "Friday", times: ["Afternoon"] },
    ],
    gymPreference: ["Wooden"],
    motivationStyle: "Supportive",
    BuddyPreferences: {
      preferredGender: "Male",
      preferredFitnessLevel: "Intermediate",
      motivationStyle: "Supportive",
    },
    bio: "Former athlete getting back into shape. Looking for a workout partner!",
    profilePicture: "http://example.com/liam_profile.jpg",
  }),

  new User({
    name: "Ava Wong",
    age: "29",
    gender: "Female",
    email: "ava.w@example.com",
    phoneNumber: "424-555-1111",
    Insta: "@ava_fit_29",
    preferredContactMethod: "Email",
    fitnessLevel: "Beginner",
    goal: ["Weight Loss", "Cardiovascular Endurance"],
    availability: [{ day: "Tuesday", times: ["Morning"] }],
    gymPreference: ["BFit"],
    motivationStyle: "Flexible",
    BuddyPreferences: {
      preferredGender: "Prefer not to disclose",
      preferredFitnessLevel: "No Preference",
      motivationStyle: "Flexible",
    },
    bio: "New mom looking to get fit and meet new people!",
    profilePicture: "http://example.com/ava_profile.jpg",
  }),

  new User({
    name: "Ethan Brown",
    age: 30,
    gender: "Male",
    email: "ethan.brown@example.com",
    phoneNumber: "415-555-1234",
    Insta: "@ethan_brown_fit",
    preferredContactMethod: "Phone",
    fitnessLevel: "Intermediate",
    goal: ["Muscle Gain", "Flexibility"],
    availability: [
      { day: "Monday", times: ["Morning"] },
      { day: "Thursday", times: ["Evening"] },
    ],
    gymPreference: ["BFit"],
    motivationStyle: "Supportive",
    BuddyPreferences: {
      preferredGender: "Male",
      preferredFitnessLevel: "Intermediate",
      motivationStyle: "Supportive",
    },
    bio: "Looking for a workout buddy to help me stay on track!",
    profilePicture: "http://example.com/ethan_profile.jpg",
  }),

  new User({
    name: "Mia Torres",
    age: 26,
    gender: "Female",
    email: "mia.torres@example.com",
    phoneNumber: "510-555-6784",
    Insta: "@mia_torres_fit",
    preferredContactMethod: "Insta",
    fitnessLevel: "Beginner",
    goal: ["Weight Loss", "Cardiovascular Endurance"],
    availability: [
      { day: "Tuesday", times: ["Afternoon"] },
      { day: "Friday", times: ["Evening"] },
    ],
    gymPreference: ["Wooden"],
    motivationStyle: "Flexible",
    BuddyPreferences: {
      preferredGender: "Prefer not to disclose",
      preferredFitnessLevel: "No Preference",
      motivationStyle: "Flexible",
    },
    bio: "Just starting my fitness journey and looking for support!",
    profilePicture: "http://example.com/mia_profile.jpg",
  }),

  new User({
    name: "Noah Smith ",
    age: 24,
    gender: "Male",
    email: "noah.smith@example.com",
    phoneNumber: "626-555-4321",
    Insta: "@noah_smith_fit",
    preferredContactMethod: "Email",
    fitnessLevel: "Advanced",
    goal: ["Muscle Gain", "Cardiovascular Endurance"],
    availability: [
      { day: "Wednesday", times: ["Morning"] },
      { day: "Saturday", times: ["Afternoon"] },
    ],
    gymPreference: ["BFit", "Wooden"],
    motivationStyle: "Competitive",
    BuddyPreferences: {
      preferredGender: "Male",
      preferredFitnessLevel: "Advanced",
      motivationStyle: "Competitive",
    },
    bio: "Dedicated lifter looking for serious training partners!",
    profilePicture: "http://example.com/noah_profile.jpg",
  }),

  new User({
    name: "Sophia Johnson",
    age: "29 ",
    gender: "Female",
    email: "sophia.johnson@example.com",
    phoneNumber: "510-555-6783",
    Insta: "@sophia_johnson_fit",
    preferredContactMethod: "Phone",
    fitnessLevel: "Intermediate",
    goal: ["Weight Loss", "Flexibility"],
    availability: [
      { day: "Monday", times: ["Evening"] },
      { day: "Thursday", times: ["Afternoon"] },
    ],
    gymPreference: ["BFit", "Wooden"],
    motivationStyle: "Supportive",
    BuddyPreferences: {
      preferredGender: "Female",
      preferredFitnessLevel: "No Preference",
      motivationStyle: "Supportive",
    },
    bio: "Looking for a community to help me stay motivated!",
    profilePicture: "http://example.com/sophia_profile.jpg",
  }),

  new User({
    name: "Liam Brown",
    age: "32 ",
    gender: "Male",
    email: "liam.brown@example.com",
    phoneNumber: "415-555-9876",
    Insta: "@liam_brown_fit",
    preferredContactMethod: "Email",
    fitnessLevel: "Advanced",
    goal: ["Muscle Gain", "Cardiovascular Endurance"],
    availability: [
      { day: "Tuesday", times: ["Morning"] },
      { day: "Friday", times: ["Evening"] },
    ],
    gymPreference: ["Wooden", "BFit"],
    motivationStyle: "Competitive",
    BuddyPreferences: {
      preferredGender: "Prefer not to disclose",
      preferredFitnessLevel: "Advanced",
      motivationStyle: "Competitive",
    },
    bio: "Passionate about fitness and looking for like-minded partners!",
    profilePicture: "http://example.com/liam_brown_profile.jpg",
  }),
];

User.insertMany(users)
  .then((result) => {
    console.log(`${result.length} users created successfully!`);
  })
  .catch((err) => {
    console.error("Error creating users:", err.message);
  })
  .finally(() => {
    mongoose.connection.close();
  });



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

      const commonGoals = user1.goal.filter((goal) =>
        user2.goal.includes(goal)
      );
      score += commonGoals.length * 5;

      const commonGyms = user1.gymPreference.filter((gym) =>
        user2.gymPreference.includes(gym)
      );
      score += commonGyms.length * 5;

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
