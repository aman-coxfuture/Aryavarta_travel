const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1. Token verify karne ke liye (Protected routes)
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // User ko database se fetch karo (password ke bina)
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// 2. Role check karne ke liye (Sirf superAdmin access kar sake)
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "superAdmin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Super Admin only." });
  }
};

module.exports = { protect, adminOnly };