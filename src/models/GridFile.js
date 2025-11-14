import mongoose from "mongoose";

const gridFileSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    studyName: { type: String, required: true },
    modality: { type: String, default: "MRI" }, // e.g., MRI, CT, X-Ray
    uploadDate: { type: Date, default: Date.now },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional: link to the uploader
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

export default mongoose.models.GridFile ||
  mongoose.model("GridFile", gridFileSchema);
