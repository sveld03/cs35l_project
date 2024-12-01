const mongoose = require("mongoose");
const ratingSchema = require("./rating.js");
const gymBuddySchema = require("./gymBuddy.js");
const userSchema = new mongoose.Schema({
  // Basic info (required for login/registering)

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
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\s]+@[^\s]+\.edu$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },

  password: { type: String, required: true },

  // Gym buddy info (optional)
  gymBuddy: gymBuddySchema,

  // Profile info (optional)
  bio: { type: String, default: "Hello world!" },
  profilePicture: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
  },

  // Dining ratings (optional)
  ratings: ratingSchema,
});

module.exports = mongoose.model('User', userSchema);
