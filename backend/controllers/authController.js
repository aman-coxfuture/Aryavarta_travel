const User = require("../models/User");
const jwt = require("jsonwebtoken");

// JWT Token generate karne ka function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Auth admin & get token (Login)
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Register a new admin (Sirf initial setup ke liye, baad me admin panel se banayenge)
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
   } catch (error) {
    console.error("Register Error:", error); // Ye terminal mein print hoga
    res.status(400).json({ message: error.message }); // Ye Postman mein dikhega
  }
};

// @desc    Update user profile (Name & Email)
// @route   PUT /api/auth/profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (email) {
      const emailExists = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: req.user._id }
      });
      if (emailExists) {
        return res.status(400).json({ message: "Email is already in use by another account" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...(name && { name: name.trim() }),
        ...(email && { email: email.trim().toLowerCase() })
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update profile" });
  }
};

module.exports = { loginUser, registerUser, updateUserProfile };