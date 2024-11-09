const mongoose = require("../db");
const availabilitySchema = require("buddyModel/availability.js");

const userSchema = new mongoose.Schema({
  // basic info
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: {
    type: String,
    enum: [
      "Male",
      "Female",
      "Transgender",
      "Non-binary",
      "Prefer not to disclose",
    ],
    required: true,
  },

  // contact info
  email: { type: String, unique: true },
  phoneNumber: { type: String, unique: true, required: true },
  Insta: { type: String, unique: true },
  preferredContactMethod: {
    type: String,
    enum: ["Email", "Phone", "Insta"],
    default: "Phone",
  },

  // fitness info
  fitnessLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  goal: {
    type: [String],
    enum: [
      "Weight Loss",
      "Muscle Gain",
      "Cardiovascular Endurance",
      "Flexibility",
    ],
    required: true,
  },
  availability: { type: [availabilitySchema], required: true },
  gymPreference: { type: [String], enum: ["Wooden", "BFit"], required: true },
  motivationStyle: {
    type: String,
    enum: ["Competitive", "Supportive", "Flexible", "Unsure"],
    default: "Unsure",
  },

  // buddy preferences

  BuddyPreferences: {
    preferredGender: {
      type: String,
      enum: [
        "Male",
        "Female",
        "Transgender",
        "Non-binary",
        "Prefer not to disclose",
      ],
      default: "Prefer not to disclose",
    },
    preferredFitnessLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "No Preference"],
      default: "No Preference",
    },
    motivationStyle: {
      type: String,
      enum: ["Competitive", "Supportive", "Flexible", "Unsure"],
      default: "Unsure",
    }
  },

  // extra profile info
  bio: { type: String },
  profilePicture: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
