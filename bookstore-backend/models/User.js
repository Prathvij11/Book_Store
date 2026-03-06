const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model("User", UserSchema);

// GET user (for login)
router.get("/", async (req, res) => {
  const users = await User.find(req.query);
  res.json(users);
});

// REGISTER
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});




module.exports = router;