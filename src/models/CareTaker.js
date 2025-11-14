import mongoose from "mongoose";

const caretakerSchema = new mongoose.Schema(
  {
    assignedPatient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    dailySummaries: [
      {
        date: { type: Date, default: Date.now },
        summary: { type: String },
      },
    ],
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

export default mongoose.models.Caretaker || mongoose.model("Caretaker", caretakerSchema);
