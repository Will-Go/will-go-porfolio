import { NextResponse, type NextRequest } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    const { data } = await axios.post(
      "https://hook.us2.make.com/q6s73of9vp3gprjv74w8b4shs7qewlj9",
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
