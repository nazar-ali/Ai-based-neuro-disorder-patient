import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req) {
  const token = req.headers.get("cookie")?.split("access_token=")[1]?.split(";")[0];

  if (!token)
    return NextResponse.json({ success: false, error: "No token found" }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded)
    return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 });

  return NextResponse.json({ success: true, data: decoded });
}
