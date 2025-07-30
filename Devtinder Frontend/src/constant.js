export const BASE_URL =
  location.hostname === "localhost"
    ? `${import.meta.env.VITE_BASE_URL}`
    : "https://devtinder-backend-wuv9.onrender.com";
