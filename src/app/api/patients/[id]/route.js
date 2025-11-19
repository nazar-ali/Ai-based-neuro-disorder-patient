import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Patient from "@/models/Patient";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const body = await req.json();

    const medicalRecordsId =
      body.medicalRecordsId || body.fullName || "Unknown";

    const demographics = {
      age: body.age ? Number(body.age) : null,
      sex: body.sex || "",
      ethnicity: body.ethnicity || "",
      weight: body.weight ? Number(body.weight) : null,
      height: body.height ? Number(body.height) : null,
    };

    const updateData = {
      fullName: body.fullName,
      medicalRecordsId,
      demographics,
      contact: body.contact || "",
      assignedDoctor: body.assignedDoctor || null,
      assignedCaretaker: body.assignedCaretaker || null,
      medicalHistory: Array.isArray(body.medicalHistory)
        ? body.medicalHistory
        : [],
      allergies: Array.isArray(body.allergies)
        ? body.allergies
        : body.allergies
        ? body.allergies.split(",").map((a) => a.trim())
        : [],
      emergencyContacts: body.emergencyContacts || [],
      consent_dataSharing: body.consent_dataSharing ?? false,
      careTeam_doctors: Array.isArray(body.careTeam_doctors)
        ? body.careTeam_doctors
        : [],
      careTeam_caretakers: Array.isArray(body.careTeam_caretakers)
        ? body.careTeam_caretakers
        : [],
    };

    if (body.userId) updateData.userId = body.userId;

    const updated = await Patient.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Patient updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const patient = await Patient.findById(params.id);

    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: patient },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const removed = await Patient.findByIdAndDelete(params.id);

    if (!removed) {
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Patient deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
