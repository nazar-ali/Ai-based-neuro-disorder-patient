import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    // Parse request body (may contain role)
    let body = {};
    try {
      body = await req.json();
    } catch {
      // ignore if empty body
    }

    const { role } = body;

    // Update user → status: approved + optional role update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        status: "approved",
        ...(role ? { role } : {}), // apply role only if provided
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User approved successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Approve User Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
