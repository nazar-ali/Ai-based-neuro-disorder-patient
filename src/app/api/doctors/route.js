import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import mongoose from "mongoose";

// Lazy-load the Doctor model to avoid occasional model-registration errors
async function getDoctorModel() {
  // If already registered on mongoose, return it
  if (mongoose.models && mongoose.models.Doctor) {
    return mongoose.models.Doctor;
  }

  // Otherwise import the model file which registers it
  const mod = await import("@/models/Docters");
  return mod.default;
}

// ==========================
// ✅ CREATE NEW DOCTOR
// ==========================
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { 
      userId,
      specialization,
      experienceYears,
      licenseNumber,
      certifications,
      assignedPatients,
    } = body;

    // Validate required field
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId is required" },
        { status: 400 }
      );
    }

    // Ensure Doctor model is available
    const Doctor = await getDoctorModel();

    // Create a new doctor document
    const newDoctor = new Doctor({
      userId,
      specialization,
      experienceYears,
      licenseNumber,
      assignedPatients,
      certifications,
    });

    const savedDoctor = await newDoctor.save();

    // If assignedPatients provided, sync to User documents so doctor/user records stay consistent
    if (Array.isArray(assignedPatients) && assignedPatients.length > 0) {
      // Import User model (may already be registered)
      const User = (await import("@/models/User")).default;

      // Add these patients to the doctor's User.assignedPatients array (if doctor exists as a User)
      try {
        await User.findByIdAndUpdate(userId, {
          $addToSet: { assignedPatients: { $each: assignedPatients } },
        });

        // Set assignedDoctor on patient user records to this doctor's userId
        await User.updateMany(
          { _id: { $in: assignedPatients } },
          { $set: { assignedDoctor: userId } }
        );
      } catch (syncErr) {
        console.warn("⚠️ Warning: failed to sync assignedPatients to User records:", syncErr && syncErr.message ? syncErr.message : syncErr);
      }
    }

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

    // Ensure the Doctor model is available and then query
    const Doctor = await getDoctorModel();
    // Populate user info so client can display name/email without extra lookups
    const doctors = await Doctor.find().populate("userId", "fullName email").populate("assignedPatients");

    // Normalize doctors to include top-level fullName/email for convenience
    const normalized = doctors.map((d) => {
      const obj = d.toObject ? d.toObject() : d;
      if (obj.userId && typeof obj.userId === 'object') {
        obj.fullName = obj.userId.fullName || obj.fullName;
        obj.email = obj.userId.email || obj.email;
      }
      // map legacy/DB field `experience` to `experienceYears` expected by UI
      obj.experienceYears = obj.experienceYears ?? obj.experience ?? undefined;
      return obj;
    });

    return NextResponse.json(
      {
        success: true,
        count: normalized.length,
        data: normalized,
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
