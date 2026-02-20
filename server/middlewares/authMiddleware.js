const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied: No token provided" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  } else {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 THIS IS THE IMPORTANT FIX
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // 👈 now you can safely use req.user.id
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

const authorizeRoles = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: You don't have access" });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = { authMiddleware, authorizeRoles };
