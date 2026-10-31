const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  whatsappNumber: { type: String, default: "919876543210" },
  businessEmail: { type: String, default: "booking@aryavartatravel.com" },
  businessPhone: { type: String, default: "+91 98765 43210" },
  address: { type: String, default: "Fort Road, Leh, Ladakh" },
  
  // Ye extra fields UI se aayengi
  delhiOfficeAddress: { type: String, default: "" },
  permitFeePerPerson: { type: Number, default: 500 },
  environmentalTaxPerPerson: { type: Number, default: 300 }
}, { timestamps: true });

module.exports = mongoose.model("Settings", settingsSchema);