import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    medicalRecordsId: { type: String },
    emergencyContacts: [
      {
        name: String,
        relation: String,
        contact: String,
        isPrimary: { type: Boolean, default: false },
      },
    ],
    consent_dataSharing: { type: Boolean, default: false },
    demographics: {
      age: Number,
      sex: String,
      ethnicity: String,
      weight: Number,
      height: Number,
    },
    careTeam_doctors: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    ],
    careTeam_caretakers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Caretaker" },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Patient || mongoose.model("Patient", patientSchema);
