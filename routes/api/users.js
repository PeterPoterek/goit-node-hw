const express = require("express");
const router = express.Router();
const User = require("../../models/users/user");

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }, { _id: 1 }).lean();

  if (user) {
    return res.status(409).json({ message: "This email is already taken." });
  }

  try {
    const newUser = new User({ email });
    await newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({ message: `${email} - User Created` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
