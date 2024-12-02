// General CRUD operations on users

const User = require("../model/user.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// get all users

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

// get a single user

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// add a user

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    userData.password = await bcrypt.hash(userData.password, 10);
    const newUser = await User.create(userData);
    if (!newUser) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json(newUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// delete a user

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such user, invalid ID" });
    }
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such user, invalid ID" });
    }
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// createUsers
const createUsers = async (req, res) => {
  results = [];
  try {
    for (userData of req.body) {
      userData.password = await bcrypt.hash(userData.password, 10);
      const newUser = await User.create(userData);
      
      if (!newUser) {
        results.push({
          name: userData.name,
          status: "was NOT added successfully",
        });
        continue;
      }
      results.push({ name: userData.name, status: "was added successfully" });
    }
    res.status(200).json({ Results: results });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  createUsers,
};
