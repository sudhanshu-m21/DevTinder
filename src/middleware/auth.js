const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("token not valid");
    const decodedObj = await jwt.verify(token, "Dev@hello123");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

module.exports = { userAuth };