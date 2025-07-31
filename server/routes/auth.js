// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const SECRET = process.env.JWT_SECRET || "jwtsecret"; // Use dotenv in production

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, mobile, role = "free" } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, mobile, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
});

module.exports = router;
