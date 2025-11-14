import mongoose from "mongoose";

const emergencyEventSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    triggeredBy: { type: String, required: true }, // who triggered the event (e.g., system, caretaker)
    reason: { type: String },
    notifiedRecipients: [
      {
        role: { type: String }, // e.g., 'doctor', 'caretaker'
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // better to reference a user
        status: { type: String, enum: ["pending", "notified", "acknowledged"], default: "pending" },
      },
    ],
    escalationChain: [
      {
        level: { type: String },
        handlerRole: { type: String },
        action: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

export default mongoose.models.EmergencyEvent || mongoose.model("EmergencyEvent", emergencyEventSchema);
