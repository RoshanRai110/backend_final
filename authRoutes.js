// routes/authRoutes.js

import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // JWT token generate karne ke liye

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log('REQ BODY:', req.body);

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email });
    
    // Agar email nahi milta, toh error message bhejein
    if (!admin) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Password compare karte hain
    const isMatch = await bcrypt.compare(password, admin.password);
    
    // Agar password match nahi hota, toh error message bhejein
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Token generate karte hain (Agar password match karta hai)
    const token = jwt.sign(
      { userId: admin._id },
      "your_jwt_secret_key",  // Replace with your secret key
      { expiresIn: "1h" } // Token expire hoga 1 ghante baad
    );

    // Successful login pe response bhejein with token
    res.json({ token });
  } catch (err) {
    console.error("Error in login route:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
