// In authRoutes.js or controllers/auth.js
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

router.post("/register", async (req, res) => {
  const { name, email, password,role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role, // ✅ Add this
      verificationToken: token,
    });
    await user.save();

    const verifyURL = `${process.env.BASE_URL}/api/auth/verify/${token}`;
    const html = `<p>Hello ${name},</p>
                  <p>Click below to verify your email:</p>
                  <a href="${verifyURL}">Verify Email</a>`;

    await sendEmail(email, "Verify your Email", html);

    res.status(201).json({ message: "Registration successful, check email for verification" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
