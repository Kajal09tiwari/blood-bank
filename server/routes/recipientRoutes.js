const express = require("express");
const router = express.Router();
const Recipient = require("../models/Recipient");
const RecipientProfile = require("../models/RecipientProfile");


router.post("/", async (req, res) => {
    try {
      const newRecipient = new RecipientProfile(req.body);
      await newRecipient.save();
      res.status(201).json(newRecipient); // ✅ Send full recipient with _id
    } catch (err) {
      console.error("❌ Error saving recipient:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  

// ✅ Add this GET route to fetch all recipients
router.get("/", async (req, res) => {
  try {
    const recipients = await RecipientProfile.find();
    res.status(200).json(recipients);
  } catch (err) {
    console.error("❌ Error fetching recipients:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
