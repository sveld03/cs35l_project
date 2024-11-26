const mongoose = require("mongoose");
const availabilitySchema = require("./availability");

const gymBuddySchema = new mongoose.Schema({
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
  preferredGender: {
    type: String,
    enum: [
      "Male",
      "Female",
      "Transgender",
      "Non-binary",
      "Prefer not to disclose",
    ],
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

  // Contact info
  Contact: {
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
          return (v === "Phone" && this.phoneNumber === None) ||
            (v === "Instagram" && this.insta === None)
            ? False
            : True;
        },
        message: (props) =>
          `Can't set ${props.value} as preferred contact because it hasn't been set yet`,
      },
    },
  },
});
module.exports = gymBuddySchema;
