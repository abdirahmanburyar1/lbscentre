import { NextResponse } from "next/server";
import { imagekit } from "@/lib/imagekit";

export async function GET() {
  if (!imagekit) {
    return NextResponse.json(
      { error: "ImageKit is not configured" },
      { status: 503 }
    );
  }

  try {
    const authParams = imagekit.helper.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (e) {
    console.error("ImageKit auth error:", e);
    return NextResponse.json(
      { error: "Failed to generate upload credentials" },
      { status: 500 }
    );
  }
}
