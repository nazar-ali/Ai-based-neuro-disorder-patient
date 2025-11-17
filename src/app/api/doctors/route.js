import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Doctor from "@/models/Docters";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    const doctors = await Doctor.find()
      .populate("userId", "fullName email")
      .lean();

    const normalized = doctors.map((d) => ({
      _id: d._id,
      userId: d.userId?._id?.toString(),
      fullName: d.userId?.fullName || "",
      email: d.userId?.email || "",
      specialization: d.specialization || "",
      experienceYears: d.experienceYears || 0,
      assignedPatients: d.assignedPatients || []
    }));

    return NextResponse.json(
      { success: true, data: normalized },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { userId, specialization, experienceYears } = body;

    if (!userId)
      return NextResponse.json(
        { success: false, message: "userId is required" },
        { status: 400 }
      );

    const doctor = await Doctor.create({
      userId,
      specialization: specialization || "",
      experienceYears: experienceYears || 0,
      assignedPatients: []
    });

    return NextResponse.json(
      { success: true, data: doctor },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
