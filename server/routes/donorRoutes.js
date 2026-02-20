const express = require("express");
const Donor = require("../models/Donor");
const Donation = require("../models/donation");
const DonorProfile = require("../models/DonorProfile");
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");
const User = require("../models/User");
const router = express.Router();


// ✅ Create Donor Entry
router.post("/add", authMiddleware, async (req, res) => {
  try {
    console.log("Add Donor Request:", req.body);
    const { name, bloodGroup, contactNumber, city, isAvailable } = req.body;
    
    // Validate Required Fields
    if (!name || !bloodGroup || !contactNumber || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user.id;

    // Prevent Duplicate Entries for the Same User
    const existingDonor = await Donor.findOne({ userId });
    if (existingDonor) {
      return res.status(400).json({ message: "Donor record already exists" });
    }

    const donor = new Donor({ userId, name, bloodGroup, contactNumber, city, isAvailable: isAvailable ?? true });
    await donor.save();

    res.status(201).json({ message: "Donor information added successfully", donor });
  } catch (error) {
    console.error("Error adding donor:", error.message); 
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get Logged-in User's Donor Info
router.get("/my-info", authMiddleware, async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id });
    if (!donor) return res.status(404).json({ message: "No donor record found" });

    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Search Donors by Blood Group & City (Public Access)
router.get("/search", async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    
    if (!bloodGroup || !city) {
      return res.status(400).json({ message: "Blood group and city are required for search" });
    }

    const donors = await Donor.find({ bloodGroup, city, isAvailable: true }).select("-userId");
    
    if (donors.length === 0) {
      return res.status(404).json({ message: "No donors found" });
    }

    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get All Donors (Admin Only)
router.get("/all", authMiddleware, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const donors = await Donor.find().populate("userId", "name email"); // Include user details
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update Donor Info (Only by the Owner)
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { bloodGroup, contactNumber, city, isAvailable } = req.body;

    const donor = await Donor.findOne({ userId: req.user.id });
    if (!donor) return res.status(404).json({ message: "No donor record found" });

    donor.bloodGroup = bloodGroup || donor.bloodGroup;
    donor.contactNumber = contactNumber || donor.contactNumber;
    donor.city = city || donor.city;
    donor.isAvailable = isAvailable !== undefined ? isAvailable : donor.isAvailable;

    await donor.save();

    res.json({ message: "Donor info updated successfully", donor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete Donor Info (Only by the Owner)
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id });
    
    if (!donor) return res.status(404).json({ message: "No donor record found" });

    await Donor.findOneAndDelete({ userId: req.user.id });
    res.json({ message: "Donor record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Admin Can Delete Any Donor
router.delete("/delete/:id", authMiddleware, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: "Donor deleted successfully by Admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ Get User's Donation History
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const donorId = req.user.id;

    // Fetch donations made by the logged-in donor
    const donations = await Donation.find({ donorId }).populate("recipientId", "name bloodGroup");

    if (donations.length === 0) {
      return res.status(404).json({ message: "No donation history found" });
    }

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get All Donations (Admin Only)
router.get("/all-donations", async (req, res) => {
  try {
      const donations = await Donation.find()
          .populate("donorId", "name email") // Ensure this matches your schema
          .populate("recipientId", "name email") // Optional
          .exec();

      res.json(donations);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.put("/update-status/:id", async (req, res) => {
  try {
      const { status } = req.body;

      if (!["pending", "completed"].includes(status)) {
          return res.status(400).json({ message: "Invalid status" });
      }

      const donation = await Donation.findByIdAndUpdate(
          req.params.id,
          { status: status },
          { new: true }
      );

      if (!donation) {
          return res.status(404).json({ message: "Donation not found" });
      }

      res.json({ message: "Status updated successfully", donation });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// ✅ Add Donor Medical Profile
// router.post("/profile/add", authMiddleware, async (req, res) => {
//   try {
//     const existingProfile = await DonorProfile.findOne({ userId: req.user.id });
//     if (existingProfile) {
//       return res.status(400).json({ error: "Profile already exists" });
//     }

//     const profile = new DonorProfile({
//       userId: req.user.id,
//       ...req.body,
//     });

//     await profile.save();
//     res.status(201).json(profile);
//   } catch (err) {
//     console.error("Profile Save Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user || user.role !== "donor" || !user.isDonorProfileComplete) {
      return res.status(404).json({ message: "Donor profile not complete" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      bloodGroup: user.bloodGroup || "Not Provided",
      totalQuantityDonated: user.totalQuantityDonated || 0,
    });
  } catch (error) {
    console.error("Donor Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// router.get("/profile/me", authMiddleware, async (req, res) => {
//   try {
//     const profile = await DonorProfile.findOne({ userId: req.user.id });
//     if (!profile) {
//       return res.status(404).json({ message: "Donor profile not found" });
//     }
//     res.status(200).json(profile);
//   } catch (error) {
//     console.error("Fetch donor profile error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// router.get("/donor/me", auth, async (req, res) => {
//   try {
//     const requiredFields = [
//       "name",
//       "age",
//       "gender",
//       "bloodType",
//       "weight",
//       "hemoglobinLevel",
//       "bloodPressure",
//       "diabetes",
//       "infections",
//       "lastDonationDate",
//       "smoker",
//       "alcoholUse",
//       "medications",
//     ];

//     const donor = await Donor.findOne({ user: req.user.id });

//     if (!donor) {
//       return res.status(400).json({ message: "Donor profile not complete" });
//     }

//     const missingFields = requiredFields.filter(
//       (field) => donor[field] === undefined || donor[field] === null || donor[field] === ""
//     );

//     if (missingFields.length > 0) {
//       return res.status(400).json({
//         message: "Donor profile not complete",
//         missingFields,
//       });
//     }

//     res.json(donor);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });





module.exports = router;
