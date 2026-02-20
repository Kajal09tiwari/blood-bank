const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Hospital = require("../models/Hospital");
const DonorProfile = require("../models/DonorProfile");
const RecipientProfile = require("../models/RecipientProfile");

const router = express.Router();
require("dotenv").config();

// 🟢 Register Hospital
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, location } = req.body;

//     const existing = await Hospital.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Email already in use" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const hospital = new Hospital({ name, email, password: hashedPassword, location });
//     await hospital.save();

//     res.status(201).json({ message: "Hospital registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// 🔵 Login Hospital
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const hospital = await Hospital.findOne({ email });
//     if (!hospital) return res.status(404).json({ message: "Hospital not found" });

//     const isMatch = await bcrypt.compare(password, hospital.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: hospital._id, role: "hospital" }, process.env.JWT_SECRET, {
//       expiresIn: "6h"
//     });

//     res.json({ token, hospital: { id: hospital._id, name: hospital.name, email: hospital.email } });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// 🩸 Get All Donor and Recipient Profiles
router.get("/all-profiles", async (req, res) => {
  try {
    const donors = await DonorProfile.find();
    const recipients = await RecipientProfile.find();
    res.json({ donors, recipients });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Approve Donor Profile
router.put("/approve-donor/:id", async (req, res) => {
  try {
    const donor = await DonorProfile.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    donor.approvedByHospital = true;
    await donor.save();
    res.json({ message: "Donor approved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// In your routes file (e.g., routes.js or hospitalRoutes.js)

// Import your donor model
const Donor = require('../models/Donor');



module.exports = router;









// const express = require("express");
// const router = express.Router();
// const Hospital = require("../models/Hospital"); // ✅ Make sure path is correct

// router.post("/login", async (req, res) => {
//   console.log("Received login request:", req.body);
//   const { username, password } = req.body;

//   try {
//     // 🔍 Find the hospital by email (NOT name!)
//     const hospital = await Hospital.findOne({ email: username });

//     if (!hospital) {
//       return res.json({ success: false, message: "Hospital not found" });
//     }

//     // ✅ Check if password matches (plaintext version)
//     if (hospital.password === password) {
//       console.log("Hospital login successful");
//       return res.json({ success: true });
//     } else {
//       return res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });




// module.exports = router;
