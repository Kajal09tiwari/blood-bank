const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patientName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  contactNumber: { type: String, required: true },
  hospitalName: { type: String, required: true },
  city: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Fulfilled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const BloodRequestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bloodGroup: { type: String, required: true },
  hospital: { type: String, required: true },
  city: { type: String, required: true },
  contactNumber: { type: String, required: true },
  status: { type: String, enum: ["active", "expired"], default: "active" },
  expiryDate: { type: Date, required: true },  // 🛑 Expiry Date Added
}, { timestamps: true });

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
