const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  bloodType: { type: String, required: true }, // Example: A, B, AB, O
  rhFactor: { type: String, enum: ["Positive", "Negative"], required: true }, // ✅ New
  urgencyLevel: { type: String, enum: ["Emergency", "High", "Medium", "Low"], required: true },
  diabetes: { type: Boolean, required: true },
  infections: { type: Boolean, required: true },
  hivStatus: { type: String, enum: ["Positive", "Negative", "Unknown"], required: true }, // ✅ New
  hemoglobinLevel: { type: Number, required: true }, // ✅ New
  organIssues: { type: String },
  medications: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RecipientProfile", recipientSchema);
