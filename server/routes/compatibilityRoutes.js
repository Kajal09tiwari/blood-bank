const express = require("express");
const router = express.Router();
const Donor = require("../models/DonorProfile");
const RecipientProfile= require("../models/RecipientProfile");

// Calculate date difference in months
function monthsSince(date) {
  const now = new Date();
  const diff = now - new Date(date);
  return diff / (1000 * 60 * 60 * 24 * 30);
}

router.post("/match", async (req, res) => {
  try {
    const { recipientId } = req.body;
    console.log("🔍 Received recipientId:", recipientId);

    // 1. Fetch recipient
    const recipient = await RecipientProfile.findById(recipientId);
    if (!recipient) {
      console.log("❌ Recipient not found");
      return res.status(404).json({ error: "Recipient not found" });
    }
    console.log("✅ Recipient found:", recipient.name);

    // 2. Fetch all donors
    const donors = await Donor.find();
    console.log("👀 Donors found:", donors.length);

    if (donors.length === 0) {
      console.log("⚠️ No donors available in database");
      return res.status(200).json([]);
    }

    // 3. Compatibility logic
    const matches = donors.map((donor) => {
      let score = 0;

      if (donor.bloodType === recipient.bloodType) score += 40;
      if (donor.hemoglobinLevel >= 12.5) score += 10;
      if (donor.bloodPressure === "Normal") score += 10;
      if (!donor.infections) score += 10;
      if (!donor.diabetes) score += 10;
      if (monthsSince(donor.lastDonationDate) >= 3) score += 10;
      if (!donor.smoker) score += 5;
      if (!donor.alcoholUse) score += 5;

      console.log(`🔍 Donor ${donor.name} - Score: ${score}`);

      return {
        donor,
        compatibility: score,
      };
    });

    // 4. Sort by compatibility
    matches.sort((a, b) => b.compatibility - a.compatibility);

    // 5. Return top matches
    res.json(matches);

  } catch (err) {
    console.error("❌ Error in compatibility matching:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/donor", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➕ Add a new recipient profile
router.post("/recipient", async (req, res) => {
  try {
    const recipient = new RecipientProfile(req.body);
    await recipient.save();
    res.status(201).json(recipient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// 📋 Get all donor profiles
router.get("/donors", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 Get all recipient profiles
router.get("/recipients", async (req, res) => {
  try {
    const recipients = await RecipientProfile.find();
    res.json(recipients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
