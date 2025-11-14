import mongoose from "mongoose";
// Ensure Patient model is registered before using it in refs/populate.
// This avoids MissingSchemaError when calling populate("assignedPatients").
import "@/models/Patient";

const doctorSchema = new mongoose.Schema(
  {
    // 🧑‍⚕️ Connects doctor profile with user login
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📋 Optional professional details
    specialization: { type: String },
    experienceYears: { type: Number, default: 0 },
    licenseNumber: { type: String },

    // 🎓 Certifications
    certifications: [
      {
        level: { type: String }, // e.g., "MBBS", "MD", "PhD"
        body: { type: String }, // e.g., "Pakistan Medical Council"
        validUntil: { type: Date },
      },
    ],

    // 🩺 Assigned patients (Doctor’s case list)
    assignedPatients: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
