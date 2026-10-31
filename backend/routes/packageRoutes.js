const express = require("express");
const router = express.Router();
const { getActivePackages, getPackageBySlug } = require("../controllers/packageController");
const { getSettings } = require("../controllers/settingsController");
// ...
router.get("/settings", getSettings); // Client site settings fetch kar sake
router.get("/", getActivePackages);
router.get("/:slug", getPackageBySlug);

module.exports = router;