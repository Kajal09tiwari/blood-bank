const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["donor", "recipient", "admin"],
   
  },
  // 🩸 Donor-specific fields
  bloodGroup: { type: String, default: "" },
  totalQuantityDonated: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
