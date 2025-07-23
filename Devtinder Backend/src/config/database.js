const mongoose = require("mongoose");
// require("dotenv").config();
const connectDB = async () => {
  // await mongoose.connect(process.env.DB_URL);
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};
module.exports = connectDB();
