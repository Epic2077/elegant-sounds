import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const protectedRoutes = ["/home"];
  const authRoutes = ["/login", "/signup"];
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log("Middleware accessToken:", accessToken);

  // Handle auth routes (login, signup)
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (accessToken) {
      try {
        await verifyToken(accessToken);
        // Valid token: Redirect to home
        return NextResponse.redirect(new URL("/home", request.url));
      } catch (error) {
        // Invalid token: Clear cookie and proceed
        const response = NextResponse.next();
        response.cookies.delete("accessToken");
        return response;
      }
    }
    return NextResponse.next();
  }

  // Handle protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await verifyToken(accessToken);
      return NextResponse.next();
    } catch (error) {
      // Invalid token: Clear cookie and redirect
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      return response;
    }
  }

  return NextResponse.next();
}
