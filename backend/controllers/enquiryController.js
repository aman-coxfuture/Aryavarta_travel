const Enquiry = require("../models/Enquiry");

// @desc    Create a new enquiry (Client Site se)
// @route   POST /api/enquiries
const createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    const savedEnquiry = await enquiry.save();
    res.status(201).json({ message: "Enquiry sent successfully", enquiry: savedEnquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all enquiries (Admin ke liye)
// @route   GET /api/admin/enquiries
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update enquiry status (Admin ke liye)
// @route   PUT /api/admin/enquiries/:id
const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createEnquiry, getAllEnquiries, updateEnquiryStatus };