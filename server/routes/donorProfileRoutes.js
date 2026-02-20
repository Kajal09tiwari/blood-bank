const express = require("express");
const router = express.Router();
const DonorProfile = require("../models/DonorProfile");
const { authMiddleware } = require("../middlewares/authMiddleware");

// 🟢 Create or Update Donor Profile
router.post("/create-or-update", authMiddleware, async (req, res) => {
    try {
      const cleanedData = {
        ...req.body,
        userId: req.user.id,
        medications: req.body.medications || "None",
        smoker: req.body.smoker === "true" || req.body.smoker === true,
        alcoholUse: req.body.alcoholUse === "true" || req.body.alcoholUse === true,
        diabetes: req.body.diabetes === "true" || req.body.diabetes === true,
        infections: req.body.infections === "true" || req.body.infections === true,
      };
  
      const existingProfile = await DonorProfile.findOne({ userId: req.user.id });
  
      if (existingProfile) {
        // 🔄 Update the existing profile
        const updatedProfile = await DonorProfile.findOneAndUpdate(
          { userId: req.user.id },
          cleanedData,
          { new: true }
        );
        return res.json({ message: "Profile updated successfully", profile: updatedProfile });
      } else {
        // 🆕 Create new profile
        const newProfile = new DonorProfile({
          ...cleanedData,
          userId: req.user.id
        });
  
        await newProfile.save();
        return res.status(201).json({ message: "Profile created successfully", profile: newProfile });
      }
    } catch (error) {
      console.error("Error in donor profile creation:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  





// 🔵 Get Logged-in User's Donor Profile
// 


// ⚠️ TEMPORARY – skip required field check
router.get("/me", authMiddleware, async (req, res) => {
    try {
      const donor = await DonorProfile.findOne({ userId: req.user.id });
  
      if (!donor) {
        return res.status(404).json({ message: "Donor profile not found" });
      }
  
      res.json(donor); // ✅ Just return the profile as-is
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  

module.exports = router;
