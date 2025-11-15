import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Patient from "@/models/Patient";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log("📥 Received patient body:", body);

    // ✅ Extract and normalize data
    const medicalRecordsId = body.medicalRecordsId || body.fullName || "Unknown";

    // Build demographics from flat fields
    const demographics = {
      age: body.age ? Number(body.age) : null,
      sex: body.sex || "",
      ethnicity: body.ethnicity || "",
      weight: body.weight ? Number(body.weight) : null,
      height: body.height ? Number(body.height) : null,
    };

    // Handle care team arrays
    const careTeam_doctors = Array.isArray(body.careTeam_doctors)
      ? body.careTeam_doctors
      : body.careTeam_doctors
      ? [body.careTeam_doctors]
      : [];

    const careTeam_caretakers = Array.isArray(body.careTeam_caretakers)
      ? body.careTeam_caretakers
      : body.careTeam_caretakers
      ? [body.careTeam_caretakers]
      : [];

    // Create patient document using fields sent by client
    const newPatientData = {
      fullName: body.fullName || medicalRecordsId,
      medicalRecordsId,
      demographics,
      contact: body.contact || "",
      assignedDoctor: body.assignedDoctor || null,
      assignedCaretaker: body.assignedCaretaker || null,
      medicalHistory: Array.isArray(body.medicalHistory) ? body.medicalHistory : (body.medicalHistory ? [body.medicalHistory] : []),
      allergies: Array.isArray(body.allergies) ? body.allergies : (body.allergies ? body.allergies.split(",").map(s=>s.trim()).filter(Boolean) : []),
      emergencyContacts: body.emergencyContacts || [],
      consent_dataSharing: body.consent_dataSharing ?? false,
      careTeam_doctors,
      careTeam_caretakers,
    };

    // include userId if the client provided one (some flows create patients tied to a user)
    if (body.userId) newPatientData.userId = body.userId;

    const newPatient = new Patient(newPatientData);

    const savedPatient = await newPatient.save();
    console.log("✅ Patient saved:", savedPatient);

    return NextResponse.json(
      {
        success: true,
        message: "Patient created successfully",
        data: savedPatient,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating patient:", error);
    // If Mongoose validation error, include field errors
    const resp = {
      success: false,
      message: error.message || "Failed to create patient",
      error: error.message,
    };
    if (error.name === 'ValidationError' && error.errors) {
      resp.details = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});
    }

    return NextResponse.json(resp, { status: 500 });
  }
}




// ================================
// 📌 GET – Fetch all patients
// ================================
export async function GET() {
  try {
    await dbConnect();

    const patients = await Patient.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: patients.length,
        data: patients,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching patients:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch patients",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

