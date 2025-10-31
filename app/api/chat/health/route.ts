import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
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
    const {
      data: { res: isHealthy },
    } = await axios.get<{
      res: boolean;
    }>(process?.env?.NEXT_PUBLIC_API_URL, {
      params: {
        check: "health",
      },
    });

    //RETURN TRUE IF THE SERVICE IS UP
    return NextResponse.json(
      { res: isHealthy === true },
      { status: isHealthy ? 200 : 503 }
    );
  } catch (error) {
    // If the service is down, return false
    return NextResponse.json({ error: "Service is down" }, { status: 500 });
  }
}
