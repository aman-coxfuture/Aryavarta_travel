const mongoose = require("mongoose");
const Package = require("../models/Package");

// @desc    Create a new package
// @route   POST /api/admin/packages
const createPackage = async (req, res) => {
  try {
    const newPackage = new Package({
      ...req.body,
      createdBy: req.user._id,
    });
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all active packages (For Client Site)
// @route   GET /api/packages
const getActivePackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single package by slug
// @route   GET /api/packages/:slug
const getPackageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    let singlePackage;
    
    // Agar URL me MongoDB ki _id aayi hai (24 characters lambi)
    if (mongoose.Types.ObjectId.isValid(slug)) {
      singlePackage = await Package.findById(slug);
    } else {
      // Agar URL me slug aayi hai (jaise leh-local-sightseeing)
      singlePackage = await Package.findOne({ slug: slug });
    }

    if (singlePackage && singlePackage.isActive) {
      res.json(singlePackage);
    } else {
      res.status(404).json({ message: "Package not found or not active" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get ALL packages (For Admin - draft + active)
// @route   GET /api/admin/packages
const getAllAdminPackages = async (req, res) => {
  try {
    const packages = await Package.find({}).sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update package
// @route   PUT /api/admin/packages/:id
const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete (Soft Delete) package
// @route   DELETE /api/admin/packages/:id
const deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Package deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPackage,
  getActivePackages,
  getPackageBySlug,
  getAllAdminPackages,
  updatePackage,
  deletePackage,
};