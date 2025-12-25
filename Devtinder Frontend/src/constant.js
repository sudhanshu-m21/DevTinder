export const BASE_URL =
  location.hostname === "localhost"
    ? `${import.meta.env.VITE_BASE_URL}`
    : `${import.meta.env.VITE_BACKEND_URL}`;
