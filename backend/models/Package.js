const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    durationDays: { type: Number, required: true },
    durationNights: { type: Number, required: true },
    pricePerAdult: { type: Number, required: true },
    route: [{ type: String }], // e.g., ["Leh", "Nubra", "Pangong"]
    
    // Day-wise itinerary
    itinerary: [
      {
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        meals: [{ type: String }], // e.g., ["Breakfast", "Dinner"]
        stay: { type: String }, // e.g., "Hotel in Leh"
      },
    ],
    
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    bestSeason: [{ type: String }],
    altitudeInfo: { type: String },
    permitRequired: { type: Boolean, default: false },
    
    coverImage: { type: String, required: true }, // Cloudinary URL
    galleryImages: [{ type: String }],
    
    isActive: { type: Boolean, default: false }, // Draft (false) ya Published (true)
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);