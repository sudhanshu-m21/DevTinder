import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constant";
const Chat = () => {
  const { targetUserId } = useParams();
  const [msg, setMsg] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChat = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMsg = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return { firstName: senderId.firstName, text };
    });
    setMsg(chatMsg);
    // console.log(chat?.data?.messages);
  };
  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", (text) => {
      setMsg((prev) => [...prev, text]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMsg = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMsg,
    });
    setNewMsg("");
  };
  return (
    <div className="my-30 w-3/4 mx-auto border border-gray-600 h-[70vh] flex flex-col">
      <h2 className="p-3 border-b border-gray-600">Chat</h2>
      <div className="flex-1 overflow-scroll p-3">
        {msg.map((message, index) => (
          <div
            key={index}
            className={`chat ${
              message.firstName === user.firstName ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-header">
              {message.firstName || "Unknown"}
              <time className="text-xs opacity-50 ml-2">
                {message.time || "just now"}
              </time>
            </div>
            <div className="chat-bubble">{message.text}</div>
            <div className="chat-footer opacity-50">
              {message.userId === userId ? "Sent" : "Received"}
            </div>
          </div>
        ))}

        {/* Optional fallback if no messages yet
        {msg.length === 0 && (
          <p className="text-center text-gray-500">No messages yet.</p>
        )} */}
      </div>

      <div className="p-3 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 border-gray-600 rounded p-2"
          type="text"
          placeholder="Write your message here...."
        />
        <button onClick={sendMsg} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
