const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    travelDates: { type: String, required: true },
    groupSize: { type: Number, required: true },
    message: { type: String },
    status: { 
      type: String, 
      enum: ["new", "contacted", "converted", "closed"], 
      default: "new" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);