import { NextResponse, type NextRequest } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  if (!process?.env?.NEXT_PUBLIC_API_URL) {
    return NextResponse.json(
      {
        error: "API URL is not defined",
      },
      {
        status: 500,
      }
    );
  }
  try {
    const { text } = await request.json();
    const { data } = await axios.post(
      process?.env?.NEXT_PUBLIC_API_URL,
      { text },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json(data);
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
