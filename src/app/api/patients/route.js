import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Patient from "@/models/Patient";
import { verifyToken } from "@/lib/jwt";
import { getToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    await dbConnect();

    const token = await getToken(req);   // ⬅ Get authenticated user
    const userId = token?.id;

    const body = await req.json();
    console.log("📥 Received patient body:", body);

    const medicalRecordsId = body.medicalRecordsId || body.fullName || "Unknown";

    const demographics = {
      age: body.age ? Number(body.age) : null,
      sex: body.sex || "",
      ethnicity: body.ethnicity || "",
      weight: body.weight ? Number(body.weight) : null,
      height: body.height ? Number(body.height) : null,
    };

    const newPatientData = {
      fullName: body.fullName || medicalRecordsId,
      medicalRecordsId,
      demographics,
      contact: body.contact || "",
      assignedDoctor: body.assignedDoctor || null,
      assignedCaretaker: body.assignedCaretaker || null,
      medicalHistory: body.medicalHistory ?? [],
      allergies: Array.isArray(body.allergies)
        ? body.allergies
        : body.allergies
        ? body.allergies.split(",").map(a => a.trim())
        : [],
      emergencyContacts: body.emergencyContacts || [],
      consent_dataSharing: body.consent_dataSharing ?? false,
      careTeam_doctors: body.careTeam_doctors ?? [],
      careTeam_caretakers: body.careTeam_caretakers ?? [],

      // ⬅ ALWAYS attach userId from token
      userId: userId,
    };

    const savedPatient = await Patient.create(newPatientData);

    return NextResponse.json(
      { success: true, message: "Patient created", data: savedPatient },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ================================
// 📌 GET – Fetch all patients
// ================================
export async function GET(req) {
  try {
    await dbConnect();
    

    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    // Decode JWT
    const decoded = verifyToken(token);
    console.log("Decoded Token:", decoded);

    const userId = decoded?.id;
    const role = decoded?.role;

    console.log("User ID:", userId);
    console.log("Role:", role);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 400 }
      );
    }

    // Only a patient can fetch this
    if (role !== "patient") {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Not a patient" },
        { status: 403 }
      );
    }

    // Fetch full patient document
    const patient = await Patient.findOne({ userId });

    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, patient },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET PATIENT ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


