const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");

router.post("/", createBooking); // Bina login ke form submit hoga

module.exports = router;