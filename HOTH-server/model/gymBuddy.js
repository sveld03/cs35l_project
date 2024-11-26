const mongoose = require("mongoose");
const availabilitySchema = require("./availability");

const gymBuddySchema = new mongoose.Schema({
  // indicate wether user is signed up to match with gym buddies
  isGymBuddy: { type: Boolean, default: false },

  // info about user as a gym buddy
  fitnessLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: function () {
      return this.isGymBuddy;
    },
  },
  goal: {
    type: String,
    enum: [
      "Weight Loss",
      "Muscle Gain",
      "Cardiovascular Endurance",
      "Flexibility",
    ],
    required: function () {
      return this.isGymBuddy;
    },
  },

  motivationStyle: {
    type: String,
    enum: ["Competitive", "Supportive", "Flexible", "Unsure"],
    required: function () {
      return this.isGymBuddy;
    },
  },

  availability: {
    type: availabilitySchema,
    required: function () {
      return this.isGymBuddy;
    },
  },

  gymPreference: {
    type: String,
    enum: ["Wooden", "BFit"],
    required: function () {
      return this.isGymBuddy;
    },
  },

  // what the user wants out of a gym buddy
  buddyPreferences: {
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
    motivationStyle: {
      type: String,
      enum: ["Competitive", "Supportive", "Flexible", "Unsure"],
      default: "Unsure",
    },
  },

  // Contact info
  contact: {
    phoneNumber: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^([\d]{10}|([\d]{3}-){2}[\d]{4})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
    insta: {
      type: String,
      validate: {
        validator: function (v) {
          return v === null || v === "" || /^@.+$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid Instagram handle. Should start with '@'`,
      },
    },
    preferredContactMethod: {
      type: String,
      enum: ["Email", "Phone", "Instagram"],
      default: "Email",
      validate: {
        validator: function (v) {
          return (v === "Phone" && !this.contact.phoneNumber) ||
            (v === "Instagram" && !this.contact.insta)
            ? false
            : true;
        },
        message: (props) =>
          `Can't set ${props.value} as preferred contact because it hasn't been set yet`,
      },
    },
  },

  // user's taste
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  successfulMatches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  notifications: [{ message: String, date: { type: Date, default: Date.now } }],

  // to ensure private data like who the user specifically likes/dislikes are never sent to the client 
  toJSON: {
    transform: function (doc, ret) {
      delete ret.likes;
      delete ret.dislikes;
      return ret;
    },
  },
});
module.exports = gymBuddySchema;
