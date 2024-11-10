import axios, { AxiosError } from "axios";
// export const BASE_URL = "http://localhost:3001";
export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
console.log("🚀 ~ file: index.tsx:3 ~ BASE_URL:", BASE_URL);

export const CLIENT_API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

CLIENT_API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log(error.message, "error interceptors");
    throw error;
  }
);
