const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // Tourist Details
    name: { type: String, required: true },
    
    // ✅ Updated Phone Validation (Sirf 10 digit allow karega)
    phone: { 
      type: String, 
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
    },
    
    // ✅ Updated Email Validation (Sahi format check karega)
    email: { 
      type: String, 
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    
    travelDate: { type: Date, required: true },
    guests: { type: Number, required: true },
    message: { type: String },

    // Package Details (Snapshot - taaki package delete hone par bhi record rahe)
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    packageTitle: { type: String, required: true },
    packagePrice: { type: Number, required: true },

    // Source: Website form se aaya ya WhatsApp button se
    source: { type: String, enum: ["form", "whatsapp"], default: "form" },

    // Booking Lifecycle
    status: { 
      type: String, 
      enum: ["new", "contacted", "confirmed", "completed", "cancelled"], 
      default: "new" 
    },

    // 💰 Payment Tracking 
    paymentStatus: { 
      type: String, 
      enum: ["pending", "partial", "paid"], 
      default: "pending" 
    },
    amountPaid: { type: Number, default: 0 },
    paymentMode: { type: String, enum: ["cash", "upi", "bank", "online", null], default: null },
    paymentDate: { type: Date, default: null },

    // Admin Notes (Internal use ke liye)
    adminNotes: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);