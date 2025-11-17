import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Caretaker from "@/models/Caretaker";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const {
      userId,
      fullName,
      email,
      password,
      contactNo,
      assignedPatients,
      
    } = body;

    // 🔍 Validate required fields
    if (!userId || !fullName || !email || !password || !contactNo) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided!" },
        { status: 400 }
      );
    }

    // 🔍 Check if caretaker already exists with email
    const existing = await Caretaker.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already registered!" },
        { status: 409 }
      );
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📝 Create caretaker
    const caretaker = await Caretaker.create({
      userId,
      fullName,
      email,
      password: hashedPassword,
      contactNo,
      assignedPatients: assignedPatients || [],
      
    });

    return NextResponse.json(
      { success: true, message: "Caretaker created successfully", caretaker },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating caretaker:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    await dbConnect();

    const caretakers = await Caretaker.find()
      .populate("assignedPatients")  // optional
      .populate("userId");           // only if userId is ObjectId ref

    return NextResponse.json(
      { success: true, caretakers },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
