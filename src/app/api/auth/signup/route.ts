import { SignupRequest, SignupResponse } from "@/types/Auth";
import { BASE_URL } from "../../Base";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse request body
    const body: SignupRequest = await request.json();
    const { email, password, firstName, lastName } = body;

    console.log("Received request body:", body);

    // Forward to backend
    const response = await axios.post<SignupResponse>(
      `${BASE_URL}/auth/register`,
      { email, password, firstName, lastName }
    );

    // Set cookies for authentication
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    // Example cookie setting (adjust based on your token structure)
    nextResponse.cookies.set("accessToken", response.data.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return nextResponse;
  } catch (error) {
    console.error("API route error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Registration failed" },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
