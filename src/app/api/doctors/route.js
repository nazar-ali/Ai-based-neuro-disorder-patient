import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";

// 🔥 Important: Register referenced models BEFORE using populate()
import "@/models/Patient";
import "@/models/Caretaker";

import Doctor from "@/models/Docters";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    const doctors = await Doctor.find()
      .populate("assignedPatients")   // now works
      .populate("userId");            // if userId is ref

    return NextResponse.json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.error("GET /doctors error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { userId, fullName, email, specialization, experience } = body;

    if (!userId || !fullName || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const doctor = await Doctor.create({
      userId,
      fullName,
      email,
      specialization,
      experience,
      assignedPatients: [],
      schedule: [],
    });

    return NextResponse.json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.error("POST /doctors error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
