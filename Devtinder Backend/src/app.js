const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const http = require("http");
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://devtinder-m28a.onrender.com",
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const changePasswordRouter = require("./routes/password");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");
// const paymentRouter = require("./routes/payments");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", changePasswordRouter);
app.use("/", userRouter);
app.use("/", chatRouter);
// app.use("/", paymentRouter);

const server = http.createServer(app);
initializeSocket(server);
connectDB
  .then(() => {
    console.log("DB connected");
    server.listen(process.env.PORT, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
