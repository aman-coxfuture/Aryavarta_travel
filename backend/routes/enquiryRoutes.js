const express = require("express");
const router = express.Router();
const { createEnquiry } = require("../controllers/enquiryController");

// Client site se enquiry aane ke liye route
router.post("/", createEnquiry);

module.exports = router;