const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital"); // ✅ Make sure path is correct

router.post("/login", async (req, res) => {
  console.log("Received login request:", req.body);
  const { username, password } = req.body;

  try {
    // 🔍 Find the hospital by email (NOT name!)
    const hospital = await Hospital.findOne({ email: username });

    if (!hospital) {
      return res.json({ success: false, message: "Hospital not found" });
    }

    // ✅ Check if password matches (plaintext version)
    if (hospital.password === password) {
      console.log("Hospital login successful");
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




module.exports = router;
