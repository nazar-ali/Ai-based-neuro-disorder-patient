import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Patient from "@/models/Patient";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    // ✅ Validate demographics safely
    const demographics = body.demographics
      ? {
          age: Number(body.demographics.age) || null,
          sex: body.demographics.sex || "",
          ethnicity: body.demographics.ethnicity || "",
          weight: Number(body.demographics.weight) || null,
          height: Number(body.demographics.height) || null,
        }
      : {};

    // ✅ Normalize care team arrays
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

    const newPatient = new Patient({
      medicalRecordsId: body.medicalRecordsId,
      emergencyContacts: body.emergencyContacts || [],
      consent_dataSharing: body.consent_dataSharing ?? false,
      demographics,
      careTeam_doctors,
      careTeam_caretakers,
    });

    const savedPatient = await newPatient.save();

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
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create patient",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
