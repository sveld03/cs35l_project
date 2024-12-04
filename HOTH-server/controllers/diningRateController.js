const User = require("../model/user.js");
const mongoose = require("mongoose");
  
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Rating = require("../model/rating");

// gets a user's ratings for a specificed dining hall
const getUserRating = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const { diningHall } = req.params;

    if (!diningHall) {
      return res.status(400).json({ message: "Dining hall name is required" });
    }
    const rating = user.ratings[diningHall]

    if (!rating) {
      return res.status(404).json({ message: `No rating found for the dining hall: ${diningHall}` });
    }

    res.json({
      location: diningHall,
      stars: rating.stars,
      comment: rating.comment,
    });

  } catch (err) {
    res.status(400).json({ message: "Invalid token", error: err.message });
  }
};

// updates a user's ratings for a specificed dining hall
const updateUserRating = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { diningHall } = req.params;
    const { stars, comment } = req.body;
    const updatedFields = {};

    if (stars) updatedFields.stars = stars;
    if (comment) updatedFields.comment = comment;

    if (!diningHall) {
      return res.status(400).json({ message: "Dining hall name is required" });
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    user.ratings[diningHall] = {
      ...user.ratings[diningHall],
      ...updatedFields
    };

    await user.save();


    res.status(200).json({ message: "Account updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


// gets every user's ratings for a specificed dining hall
const getStars = async (req, res) => {
  const { diningHall } = req.params;

  if (!diningHall) {
    return res.status(400).json({ message: "Dining hall name is required" });
  }

  try {
    const users = await User.find();

    const ratings = [];

    users.forEach(user => {
      if (user.ratings && user.ratings[diningHall]) {
        const rating = user.ratings[diningHall];
        if (rating && typeof rating.stars === 'number') {
          ratings.push(rating.stars);
        }
      }
    });

    if (ratings.length === 0) {
      return res.status(404).json({ message: `No ratings found for the dining hall: ${diningHall}` });
    }

    const totalStars = ratings.reduce((acc, curr) => acc + curr, 0);
    const averageStars = totalStars / ratings.length;

    res.json({
      averageStars: averageStars.toFixed(2)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


const getComments = async (req, res) => {
  const { diningHall } = req.params;

  if (!diningHall) {
    return res.status(400).json({ message: "Dining hall name is required" });
  }

  try {
    const users = await User.find();

    const comments = [];

    users.forEach(user => {
      if (user.ratings && user.ratings[diningHall]) {
        const rating = user.ratings[diningHall];
        if (rating && rating.comment) {
          comments.push({
            name: user.name,
            comment: rating.comment
          });
        }
      }
    });

    if (comments.length === 0) {
      return res.status(404).json({ message: `No comments found for the dining hall: ${diningHall}` });
    }

    res.json({
      location: diningHall,
      comments: comments
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};




module.exports = { getUserRating, updateUserRating, getStars, getComments };