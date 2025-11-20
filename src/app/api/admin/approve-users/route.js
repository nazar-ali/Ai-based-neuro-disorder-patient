import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    const approved = await User.find({ status: "approved" }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      users: approved,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
