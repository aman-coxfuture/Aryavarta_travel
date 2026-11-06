const express = require("express");
const router = express.Router();

const { getSettings } = require("../controllers/settingsController");

// Public API: Client website settings fetch kar sake
router.get("/", getSettings);

module.exports = router;
