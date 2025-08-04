import io from "socket.io-client";
import { BASE_URL } from "../constant";

export const createSocketConnection = () => {
  if (location.hostname == "localhost") return io(BASE_URL);
  else
    return io("https://devtinder-backend-bth2.onrender.com", {
      path: "/socket.io",
    });
};
