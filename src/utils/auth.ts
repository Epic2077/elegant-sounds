import { BASE_URL } from "@/app/api/Base";
import axios from "axios";

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    );

    return response.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
};
