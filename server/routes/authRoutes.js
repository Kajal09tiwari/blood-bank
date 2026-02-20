const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config(); // Load environment variables




// 🛑 Middleware for Authentication


const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

  try {
    // Token me "Bearer" likha hai toh usko remove karna zaroori hai
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// 🛑 Middleware for Role-Based Authorization
const authorizeRoles = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied: Unauthorized role" });
  }
  next();
};

// 🟢 User Registration Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ field: "email", message: "Email already exists" });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = role && ["donor", "recipient", "admin"].includes(role) ? role : "donor";
    console.log("Received Role from Request:", role);
    console.log("Final Role to be Saved:", userRole);

    // Create new user
    user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role: userRole 
    });

    await user.save();
    console.log("User saved to DB:", user); // Check saved user


    // Generate JWT token with role
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// 🔵 User Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Pehle user find karo
    let user = await User.findOne({ email });
    console.log("User fetched from DB:", user); // Check DB User

    if (!user) return res.status(400).json({ field: "email", message: "Email not found" });

    // ✅ Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ field: "password", message: "Incorrect password" });

    // ✅ JWT Token generate
    const tokenPayload = { id: user._id, name: user.name, email: user.email, role: user.role };
    console.log("Token Payload before signing:", tokenPayload); // Check token data

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
});


// 🔴 Protected Profile Route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ Admin-only Route to Get All Users
router.get("/all-users", authMiddleware, authorizeRoles(["admin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🩸 Donor Dashboard - Get Current Donor Info
router.get("/donor/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user || user.role !== "donor") {
      return res.status(404).json({ message: "Donor not found" });
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




module.exports = router;
