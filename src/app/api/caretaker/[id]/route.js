import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Caretaker from "@/models/Caretaker";
import bcrypt from "bcryptjs";

// ======================
// 📌 GET SINGLE CARETAKER
// ======================
export async function GET(_, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const caretaker = await Caretaker.findById(id).populate(
      "assignedPatients",
      "fullName _id contactNo"
    );

    if (!caretaker) {
      return NextResponse.json(
        { success: false, message: "Caretaker not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, caretaker },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ======================
// 📌 UPDATE CARETAKER
// ======================
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();

    // 🔐 Hash password only if updated
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const updatedCaretaker = await Caretaker.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCaretaker) {
      return NextResponse.json(
        { success: false, message: "Caretaker not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Caretaker updated successfully",
        caretaker: updatedCaretaker,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ======================
// 📌 DELETE CARETAKER
// ======================
export async function DELETE(_, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deleted = await Caretaker.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Caretaker not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Caretaker deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
