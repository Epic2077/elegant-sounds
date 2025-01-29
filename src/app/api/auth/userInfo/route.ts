import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "../../Base";

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "No AccessToken" }, { status: 401 });
    }

    const response = await axios.get(`${BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Return the data from the response
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user info" },
      { status: 500 }
    );
  }
}
