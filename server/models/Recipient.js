const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  bloodType: { type: String, required: true },
  medicalConditions: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipient", recipientSchema);
