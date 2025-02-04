import axios from "axios";
import { BASE_URL } from "../../Base";
import { NextResponse } from "next/server";
import { LoginRequest, LoginResponse } from "@/types/Auth";

export async function POST(request: Request) {
  try {
    //Parse request body
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Forward to backend
    const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    //set cookies for authentication
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    nextResponse.cookies.set("accessToken", response.data.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
    console.log("AccessToken:", response.data.tokens.accessToken);

    return nextResponse;
  } catch (error) {
    console.error("API route error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Login failed" },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
