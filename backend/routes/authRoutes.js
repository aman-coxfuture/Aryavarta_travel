const express = require("express");
const router = express.Router();
const { loginUser, registerUser, updateUserProfile } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.post("/register", protect, adminOnly, registerUser);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
