import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const { reason } = await req.json(); // optional reason

    // Check if id is provided
    if (!id) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    // Update user status to rejected
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        rejectionReason: reason || null,
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
      message: "User rejected successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Reject User Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
