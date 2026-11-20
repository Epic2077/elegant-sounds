import { verifyToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/home"];
const authRoutes = ["/auth/login", "/auth/signup"];

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. The file must live in the
// project root or next to `app` inside `src` (NOT inside `src/app`), and it must
// export a function named `proxy` (or a default export).
export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  const matches = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`);

  // Handle auth routes (login, signup)
  if (authRoutes.some(matches)) {
    if (accessToken) {
      try {
        await verifyToken(accessToken);
        // Valid token: Redirect to home
        return NextResponse.redirect(new URL("/home", request.url));
      } catch {
        // Invalid token: Clear cookie and proceed
        const response = NextResponse.next();
        response.cookies.delete("accessToken");
        return response;
      }
    }
    return NextResponse.next();
  }

  // Handle protected routes
  if (protectedRoutes.some(matches)) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      await verifyToken(accessToken);
      return NextResponse.next();
    } catch {
      // Invalid token: Clear cookie and redirect
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url),
      );
      response.cookies.delete("accessToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  // Skip API routes, Next.js internals and static assets so auth redirects
  // never interfere with /api/auth/* handlers or asset loading.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
