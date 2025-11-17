import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Doctor from "@/models/Docters";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const doc = await Doctor.findById(params.id)
      .populate("userId", "fullName email")
      .lean();

    if (!doc)
      return NextResponse.json(
        { success: false, message: "Doctor not found" },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: doc._id,
          userId: doc.userId?._id?.toString(),
          fullName: doc.userId?.fullName,
          email: doc.userId?.email,
          specialization: doc.specialization,
          experienceYears: doc.experienceYears
        }
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();

    const updated = await Doctor.findByIdAndUpdate(params.id, body, {
      new: true
    });

    return NextResponse.json(
      { success: true, data: updated },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const deleted = await Doctor.findByIdAndDelete(params.id);

    if (!deleted)
      return NextResponse.json(
        { success: false, message: "Doctor not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { success: true, message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
