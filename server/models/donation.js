


// const mongoose = require("mongoose");

// const DonationSchema = new mongoose.Schema({
//   donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
//   bloodGroup: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   date: { type: Date, default: Date.now },
//   status: { type: String, enum: ["pending", "completed"], default: "pending" }
// });

// // 🛡️ This line prevents OverwriteModelError
// module.exports = mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
