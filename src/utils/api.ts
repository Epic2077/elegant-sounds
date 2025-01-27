import { BASE_URL } from "@/app/api/Base";
import axios from "axios";
import { refreshToken } from "./auth";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    //check if the error is due to an expired token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const newAccessToken = await refreshToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log the user out
        console.error("Refresh token expired or invalid:", refreshError);
        localStorage.removeItem("username"); // 👈 Call global logout
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
