const express = require("express");
const router = express.Router();
const User = require("../../models/users/user");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {
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
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: `${email} - does not exists.` });
  }
  const isPasswordCorrect = await user.validatePassword(password);
  if (isPasswordCorrect) {
    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Password is wrong" });
  }
});

module.exports = router;
