import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Doctor from "@/models/Docters";

// ==========================
// ✅ CREATE NEW DOCTOR
// ==========================
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { assignedPatients, certifications } = body;

    // Create a new doctor document
    const newDoctor = new Doctor({
      assignedPatients,
      certifications,
    });

    const savedDoctor = await newDoctor.save();

    return NextResponse.json(
      {
        success: true,
        message: "Doctor created successfully",
        data: savedDoctor,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating doctor:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create doctor",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ==========================
// ✅ GET ALL DOCTORS
// ==========================
export async function GET() {
  try {
    await dbConnect();

    const doctors = await Doctor.find().populate("assignedPatients");

    return NextResponse.json(
      {
        success: true,
        count: doctors.length,
        data: doctors,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching doctors:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch doctors",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
