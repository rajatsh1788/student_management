const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const auth = require("../middleware/authMiddleware");

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      email,
      password: hashed,
      course
    });

    await student.save();

    res.json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({ token, student });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ UPDATE PASSWORD
router.put("/update-password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const student = await Student.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong old password" });
    }

    student.password = await bcrypt.hash(newPassword, 10);
    await student.save();

    res.json({ msg: "Password updated" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ UPDATE COURSE
router.put("/update-course", auth, async (req, res) => {
  try {
    const { course } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { course },
      { new: true }
    );

    res.json(student);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;