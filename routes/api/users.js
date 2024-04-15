const express = require("express");
const router = express.Router();
const User = require("../../models/users/user");
const jwt = require("jsonwebtoken");
const { signupSchema, loginSchema } = require("../../validation.js");

router.post("/signup", async (req, res, next) => {
  const { error } = signupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }, { _id: 1 }).lean();

  if (user) {
    return res.status(409).json({ message: `${email} is already taken.` });
  }

  try {
    const newUser = new User({ email });
    await newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({ message: `${email} - User Created.` });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong." });
    }

    const isPasswordCorrect = await user.validatePassword(password);

    if (isPasswordCorrect) {
      const payload = {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
      };

      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });

      return res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
    } else {
      return res.status(401).json({ message: "Email or password is wrong." });
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

router.post("/logout", async (req, res) => {});

module.exports = router;
