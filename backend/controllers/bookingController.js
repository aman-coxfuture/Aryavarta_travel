const Booking = require("../models/Booking");
const Package = require("../models/Package");

// @desc    Create a new booking (Public - Client Site)
// @route   POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { packageId, name, phone, email, travelDate, guests, message, source } = req.body;

    // 1. Package check karo
    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    // 2. Booking banao (Package ka title aur price snapshot le lo)
    const booking = new Booking({
      name, phone, email, travelDate, guests, message,
      packageId: pkg._id,
      packageTitle: pkg.title,
      packagePrice: pkg.pricePerAdult * guests, // Assuming price per adult
      source: source || "form"
    });

    const savedBooking = await booking.save();
    res.status(201).json({ message: "Booking successful", booking: savedBooking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin Dashboard)
// @route   GET /api/admin/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Booking Status (Admin)
// @route   PUT /api/admin/bookings/:id/status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update Payment Status (Mark as Paid - Admin)
// @route   PUT /api/admin/bookings/:id/payment
const updatePayment = async (req, res) => {
  try {
    const { paymentStatus, amountPaid, paymentMode, paymentDate } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus, amountPaid, paymentMode, paymentDate },
      { returnDocument: 'after'  }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found. Check the ID." });
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createBooking, getAllBookings, updateBookingStatus, updatePayment };