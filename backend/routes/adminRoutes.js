const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const { getAllEnquiries, updateEnquiryStatus } = require("../controllers/enquiryController");
const { getSettings, updateSettings } = require("../controllers/settingsController");

// Controllers Import
const { createPackage, getAllAdminPackages, updatePackage, deletePackage } = require("../controllers/packageController");
const { uploadImage } = require("../controllers/uploadController");
const { getAllBookings, updateBookingStatus, updatePayment, deleteBooking } = require("../controllers/bookingController");

// Sabhi admin routes protected hain (Bina token ke koi access nahi kar sakta)
router.use(protect); 

// ================= PACKAGE ROUTES =================
router.route("/packages")
  .get(getAllAdminPackages)
  .post(createPackage);

router.route("/packages/:id")
  .put(updatePackage)
  .delete(deletePackage);

// Image Upload Route
router.post("/upload", upload.single("image"), uploadImage);


// ================= BOOKING ROUTES =================
// Saari bookings dekhne ke liye
router.get("/bookings", getAllBookings);

// Booking ka status update karne ke liye (new -> contacted -> confirmed)
router.put("/bookings/:id/status", updateBookingStatus);

// Payment update karne ke liye (Mark as Paid)
router.put("/bookings/:id/payment", updatePayment);

// Booking delete karne ke liye
router.delete("/bookings/:id", deleteBooking);
router.get("/enquiries", getAllEnquiries);
router.put("/enquiries/:id", updateEnquiryStatus);
router.get("/settings", getSettings);   // Admin fetch kar sake
router.put("/settings", updateSettings);

module.exports = router;