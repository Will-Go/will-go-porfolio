import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    const externalRes = await fetch(
      "https://hook.us2.make.com/q6s73of9vp3gprjv74w8b4shs7qewlj9",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );
    if (!externalRes.ok) {
      return NextResponse.json(
        { error: "External service error" },
        { status: externalRes.status }
      );
    }
    const data = await externalRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
