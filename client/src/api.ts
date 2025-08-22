import axios from "axios";
import type { Bid } from "./types";

const BASE_URL = "http://localhost:5000/api";
export const PUBLIC_URL = "http://localhost:5000";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user && user.token) {
          console.log(user.token);
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error("Error parsing user data from sessionStorage:", error);
        // Optional: Clear invalid data
        sessionStorage.removeItem("user");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor to handle common errors
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const bidsApi = {
  getBids: async (): Promise<Bid[]> => {
    return (await API.get("/bids")) as Bid[];
  },
};
export default API;
