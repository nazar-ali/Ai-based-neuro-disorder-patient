import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    const rejectedUsers = await User.find({ status: "rejected" })
      .select("fullName email role status rejectionReason createdAt");

    return NextResponse.json({
      success: true,
      users: rejectedUsers,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
