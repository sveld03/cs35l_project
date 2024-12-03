// controllers/authController.js

// for authentication - register and log in for users

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const nodemailer = require('nodemailer');

// Register a new user - ensure user is not existing and info entered meets user schema requirements
const registerUser = async (req, res) => {
  try {
    const { name, age, gender, email, password } = req.body;
    console.log(User);
    const isUserExisting = await User.findOne({ email });
    if (isUserExisting) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      age,
      gender,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

// Register multiple users (to fill database quickly)
const registerUsers = async (req, res) => {
  try {
    const results = [];
    for (user of req.body) {
      const { name, age, gender, email, password } = user;
      const isUserExisting = await User.findOne({ email });
      if (isUserExisting) {
        results.push({
          email,
          status: "skipped",
          reason: "User already exists",
        });
        continue;
      }
      results.push({
        email,
        status: "success",
        reason: "User registered successfully",
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        age,
        gender,
        email,
        password: hashedPassword,
      });
      await newUser.save();
    }
    res.status(201).json({ message: "User registered", results });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

// User login - check for matching email and password and create token if successful
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials bc can't find user" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify token - using JWT to ensure user is valid

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Access denied, token required" });
  console.log("Token:", token); // Log the token for debugging
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("user id", decoded.userId);
    req.userId = decoded.userId; // don't make it respond immediately bc this acts as middleware
    next(); // proceeds to next middleware
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Function to send the email
const sendThankYouEmail = async (email) => {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
      },
  });

  const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Thank you for filling out the form!',
      text: 'Thank you for submitting your preferences. We’ll be in touch soon!',
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
  } catch (err) {
      console.error('Error sending email:', err);
  }
};

module.exports = { registerUser, loginUser, verifyToken, registerUsers, sendThankYouEmail };
