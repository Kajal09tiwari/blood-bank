const express = require("express");
const BloodRequest = require("../models/BloodRequest");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// 🟢 Create a Blood Request
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { patientName, bloodGroup, contactNumber, hospitalName, city } = req.body;
    const userId = req.user.id;

    const bloodRequest = new BloodRequest({
      userId,
      patientName,
      bloodGroup,
      contactNumber,
      hospitalName,
      city,
    });

    await bloodRequest.save();
    res.status(201).json({ message: "Blood request added successfully", bloodRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔵 Get All Blood Requests
router.get("/", async (req, res) => {
  try {
    const requests = await BloodRequest.find().populate("userId", "name");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔵 Get Logged-in User's Blood Requests
router.get("/my-requests", authMiddleware, async (req, res) => {
  try {
    const requests = await BloodRequest.find({ userId: req.user.id });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🟡 Update Blood Request Status
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await BloodRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Blood request not found" });

    request.status = status || request.status;
    await request.save();

    res.json({ message: "Blood request updated successfully", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/active-requests", async (req, res) => {
  try {
    const currentDate = new Date();

    // 🛑 Expired Requests ko hata diya
    const activeRequests = await BloodRequest.find({ expiryDate: { $gte: currentDate }, status: "active" });

    res.status(200).json(activeRequests);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// 🔴 Delete Blood Request
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    await BloodRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Blood request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
