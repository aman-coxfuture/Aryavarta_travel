const Settings = require("../models/settings")

// Get Settings (Client aur Admin dono ke liye)
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Agar database khali hai, toh default settings bana do
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Settings (Sirf Admin)
const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();

    // Jo data admin bhejega, use update kar do
    Object.assign(settings, req.body);
    const updatedSettings = await settings.save();
    
    res.json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getSettings, updateSettings };