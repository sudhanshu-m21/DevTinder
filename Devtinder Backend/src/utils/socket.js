const socket = require("socket.io");
const { Chat } = require("../models/chat");
const allowedOrigins = [
  "http://localhost:5173",
  "https://devtinder-m28a.onrender.com",
];
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "https://devtinder-m28a.onrender.com",
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const room = [userId, targetUserId].sort().join("_");
      socket.join(room);
    });
    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        try {
          const room = [userId, targetUserId].sort().join("_");
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();
          io.to(room).emit("messageReceived", { firstName, text });
        } catch (error) {
          console.log(error);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
