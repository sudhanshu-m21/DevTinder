export const BASE_URL =
  location.hostname === "localhost"
    ? `${import.meta.env.VITE_BASE_URL}`
    : "/api";
