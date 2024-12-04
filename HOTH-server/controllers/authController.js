// for authentication - register and log in for users

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// Register a new user - ensure user is not existing and info entered meets user schema requirements
const registerUser = async (req, res) => {
  try {
    const { name, age, gender, email, password } = req.body;
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
    const user = await User.findOne({ email });
    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(201).json({ message: "User registered", token });
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

const getAccount = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Fetch the user from the database using the userId from the token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's details (name, email, age, gender)
    res.status(200).json({
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid token", error: err.message });
  }
};

const updateAccount = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Fetch the user from the database
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the fields to update from the request body
    const { name, age, gender, password } = req.body;
    const updatedFields = {};

    // Only update fields that are provided
    if (name) updatedFields.name = name;
    if (age) updatedFields.age = age;
    if (gender) updatedFields.gender = gender;

    // If password is provided, hash it and update it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    // If no fields to update, respond with a message
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Update the user in the database
    await User.findByIdAndUpdate(user._id, updatedFields);

    // Respond with a success message
    res.status(200).json({ message: "Account updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


module.exports = { registerUser, loginUser, verifyToken, registerUsers, getAccount, updateAccount };
