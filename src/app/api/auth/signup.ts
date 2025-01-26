import { SignupRequest, SignupResponse } from "@/types/Auth";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../Base";
import axios from "axios";

export default async function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse<SignupResponse | { message: string }>
) {
  if (req.method === "POST") {
    const { email, password, firstName, lastName }: SignupRequest = req.body;

    try {
      // Forward the request to the backend server using axios
      const response = await axios.post<SignupResponse>(
        `${BASE_URL}/auth/signup`,
        { email, password, firstName, lastName }
      );

      // Sending the response back to the client
      res.status(response.status).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handling axios-specific errors
        res.status(error.response?.status || 500).json({
          message: error.response?.data.message || "Internal server error",
        });
      } else {
        // Handling normal errors
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
