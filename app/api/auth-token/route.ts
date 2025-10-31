import { NextResponse, type NextRequest } from "next/server";
import axios from "axios";
import { SignJWT } from "jose";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    // Replace with your actual validation logic
    const validCode = process.env.SECRET_PASS; // This should be from environment variables
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return NextResponse.json(
        { error: "JWT secret not configured" },
        { status: 500 }
      );
    }

    if (code === validCode) {
      // Create a TextEncoder to convert the secret to Uint8Array
      const secret = new TextEncoder().encode(jwtSecret);

      // Create JWT token using jose
      const token = await new SignJWT({
        authenticated: true,
        timestamp: Date.now(),
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("8h")
        .sign(secret);

      // Create a response with a token or session
      const response = NextResponse.json({
        valid: true,
        message: "Code is valid",
      });

      // Set a cookie with the JWT token
      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    } else {
      return NextResponse.json(
        { valid: false, message: "Invalid code" },
        { status: 401 }
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
