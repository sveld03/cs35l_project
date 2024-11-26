// for authentication - register and log in for users

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

// Register a new user - ensure user is not existing and info entered meets user schema requirements
const registerUser = async (req, res) => {
  try {
    const { name, age, gender, email, password } = req.body;
    const isUserExisting = await User.findOne({ email });
    if (isUserExisting) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, age, gender, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// User login - check for matching email and password and create token if successful
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify token - using JWT to ensure user is valid

const verifyToken = (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Access denied, token required" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ message: "Token valid", userId: decoded.userId }); // extracted from payload of jwt token
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { registerUser, loginUser, verifyToken };
