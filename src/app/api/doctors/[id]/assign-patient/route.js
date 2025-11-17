import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Doctor from "@/models/Docters";
import Patient from "@/models/Patient";
import User from "@/models/User";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { patientId } = await req.json();
    if (!patientId)
      return NextResponse.json({ success: false, message: "patientId required" }, { status: 400 });

    const doctor = await Doctor.findById(params.id);
    if (!doctor)
      return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    await Doctor.findByIdAndUpdate(doctor._id, {
      $addToSet: { assignedPatients: patientId }
    });

    await User.findByIdAndUpdate(patientId, { assignedDoctor: doctor._id });

    await Patient.findOneAndUpdate(
      { userId: patientId },
      { assignedDoctor: doctor._id },
      { upsert: true }
    );

    return NextResponse.json(
      { success: true, message: "Patient assigned" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
