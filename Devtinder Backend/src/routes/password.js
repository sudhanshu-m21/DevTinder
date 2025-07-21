const express = require("express");
const passwordRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const validator = require("validator");
const bcrypt = require("bcrypt");

passwordRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const user = req.user;
    if (!user) throw new Error("Login for password change.");
    if (!validator.isStrongPassword(newPassword))
      throw new Error("Enter a strong password.");
    const isPasswordValid = await user.validatePassword(newPassword);
    if (isPasswordValid)
      throw new Error("New password cannot be same as old password");
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;
    await user.save();
    res.send(`${user.firstName}, your password is updated.`);
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong." });
  }
});

module.exports = passwordRouter;
