import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Doctor from "@/models/Docters";
import User from "@/models/User";
import mongoose from "mongoose";

// =======================================
// 📌 GET – Fetch all doctors
// =======================================
export async function GET() {
  try {
    await dbConnect();

    const doctors = await Doctor.find()
      .populate("userId", "fullName email") // populate basic user data
      .populate("assignedPatients", "fullName email age") // populate assigned patients
      .lean();

    // Normalize data before sending to frontend
    const formatted = doctors.map((doc) => ({
      _id: doc._id.toString(),
      userId: doc.userId?._id?.toString() || null,
      fullName: doc.userId?.fullName || doc.fullName || "",
      email: doc.userId?.email || doc.email || "",
      specialization: doc.specialization || "",
      experience: doc.experience || 0,

      assignedPatients: (doc.assignedPatients || []).map((p) => ({
        _id: p._id.toString(),
        fullName: p.fullName,
        email: p.email,
        age: p.age,
      })),

      schedule: doc.schedule || [],
    }));

    return NextResponse.json(
      { success: true, count: formatted.length, data: formatted },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error fetching doctors:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// =======================================
// 📌 POST – Create a doctor
// =======================================
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      userId,
      fullName,
      email,
      specialization,
      experience,
      assignedPatients,
      schedule,
    } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId is required" },
        { status: 400 }
      );
    }

    const doctorData = {
      userId: new mongoose.Types.ObjectId(userId),
      fullName: fullName || "",
      email: email || "",
      specialization: specialization || "",
      experience: experience || 0,
      assignedPatients: Array.isArray(assignedPatients)
        ? assignedPatients
        : assignedPatients
        ? [assignedPatients]
        : [],
      schedule: Array.isArray(schedule) ? schedule : [],
    };

    const createdDoctor = await Doctor.create(doctorData);

    return NextResponse.json(
      {
        success: true,
        message: "Doctor created successfully",
        data: createdDoctor,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error creating doctor:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
