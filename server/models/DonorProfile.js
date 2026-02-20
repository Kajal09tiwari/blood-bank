const mongoose = require("mongoose");

const donorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  bloodType: { type: String, required: true },
  weight: { type: Number, required: true },
  hemoglobinLevel: { type: Number, required: true },
  bloodPressure: { type: String, enum: ["Normal", "High", "Low"], required: true },
  diabetes: { type: Boolean, required: true },
  infections: { type: Boolean, required: true },
  lastDonationDate: { type: Date },
  smoker: { type: Boolean },
  alcoholUse: { type: Boolean },
  medications: { type: String },

  // ✅ New field for location
  location: { type: String, required: false },

  approvedByHospital: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DonorProfile", donorProfileSchema);
