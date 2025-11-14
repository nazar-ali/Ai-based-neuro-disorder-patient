import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    type: {
      type: String,
      enum: ["medication", "appointment", "checkup", "custom"],
      default: "custom",
    },
    message: { type: String, required: true },
    deliveredAt: { type: Date },
    status: {
      type: String,
      enum: ["pending", "sent", "delivered", "failed"],
      default: "pending",
    },
    channel: {
      type: String,
      enum: ["sms", "email", "app_notification"],
      default: "app_notification",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

export default mongoose.models.Reminder ||
  mongoose.model("Reminder", reminderSchema);
