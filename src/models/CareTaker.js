import mongoose from "mongoose";

const CaretakerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  assignedPatients: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Patient" }
  ],

  notes: [
    {
      timestamp: Date,
      note: String,
    },
  ],
});

export default mongoose.models.Caretaker || mongoose.model("Caretaker", CaretakerSchema);
