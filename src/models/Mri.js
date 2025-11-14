import mongoose from "mongoose";

const mriRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    studyDate: { type: Date, required: true },
    modality: { type: String, default: "MRI" }, // could be MRI, fMRI, etc.
    description: { type: String },
    predictions_modelVersion: { type: String },
    predictions_results: { type: String }, // can be text, JSON string, or structured later
    notes: [{ type: String }],
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

export default mongoose.models.MRIRecord || mongoose.model("MRIRecord", mriRecordSchema);
