// lib/api.ts
import { BASE_URL } from "@/app/Base";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedRequests: any[] = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequests.push(() => resolve(api(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh tokens
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Update access token in cookies
        document.cookie = `accessToken=${data.accessToken}; path=/; secure=${
          process.env.NODE_ENV === "production"
        }; sameSite=lax`;

        // Retry failed requests
        failedRequests.forEach((cb) => cb());
        failedRequests = [];

        return api(originalRequest);
      } catch (refreshError) {
        // Clear cookies and redirect to login
        await axios.post(
          `${BASE_URL}/auth/logout`,
          {},
          { withCredentials: true }
        );
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
