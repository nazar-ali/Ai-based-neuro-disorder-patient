import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    name: { type: String, required: true },
    dose: { type: String },
    schedule: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    adherenceNotes: { type: String },
    adherenceTaken: { type: Boolean, default: false },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

export default mongoose.models.Medication || mongoose.model("Medication", medicationSchema);
