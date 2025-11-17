import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Patient from "@/models/Patient";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const patients = await Patient.find({ assignedDoctor: params.id })
      .populate("userId", "fullName email")
      .lean();

    const formatted = patients.map((p) => ({
      _id: p._id,
      userId: p.userId?._id,
      fullName: p.userId?.fullName,
      email: p.userId?.email,
      assignedDoctor: p.assignedDoctor
    }));

    return NextResponse.json(
      { success: true, data: formatted },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
