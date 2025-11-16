import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Doctor from "@/models/Docters";

// ==========================
// ✅ DELETE DOCTOR BY ID
// ==========================
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Doctor ID is required" },
        { status: 400 }
      );
    }

    let deletedDoctor = null;
    try {
      // Try delete by Mongo _id first
      deletedDoctor = await Doctor.findByIdAndDelete(id);
    } catch (castErr) {
      // If cast error (id not a valid ObjectId), try to delete by userId (string)
      console.warn("⚠️ findByIdAndDelete cast error, trying userId lookup:", castErr && castErr.message);
      deletedDoctor = await Doctor.findOneAndDelete({ userId: id });
    }

    if (!deletedDoctor) {
      return NextResponse.json(
        { success: false, message: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Doctor deleted successfully",
        data: deletedDoctor,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting doctor:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete doctor",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
