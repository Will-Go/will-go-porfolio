import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // Check if user has the auth token
  const authToken = request.cookies.get("auth-token");
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("JWT_SECRET not configured");
    return NextResponse.redirect(new URL("/give-me-the-token", request.url));
  }

  // If no token, redirect to auth page
  if (!authToken) {
    return NextResponse.redirect(new URL("/give-me-the-token", request.url));
  }

  try {
    // Create a TextEncoder to convert the secret to Uint8Array
    const secret = new TextEncoder().encode(jwtSecret);

    // Verify the JWT token using jose
    const { payload } = await jwtVerify(authToken.value, secret);

    // Check if token contains the authenticated flag
    if (payload.authenticated === true) {
      // If authenticated, allow access
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/give-me-the-token", request.url));
    }
  } catch (error) {
    // If token is invalid or expired, redirect to auth page
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/give-me-the-token", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/do-not-get-in-here",
};
