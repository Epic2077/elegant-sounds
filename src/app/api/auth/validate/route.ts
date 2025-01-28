// app/api/auth/validate/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { BASE_URL } from "../../Base";

export async function GET(request: NextRequest) {
  try {
    // Get the accessToken from cookies
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ isLoggedIn: false }, { status: 401 });
    }

    // Forward the token to your backend for validation
    const response = await axios.get(`${BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!!response) {
      return NextResponse.json({ isLoggedIn: true }, { status: 200 });
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }
}
