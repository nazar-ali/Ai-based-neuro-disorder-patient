import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "patient",
      enum: ["patient", "caretaker", "doctor", "admin"], // ✅ includes admin
      required: [true, "Please provide a role"],
    },
    profileImageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

// ✅ Fix: clear old cached model first
delete mongoose.models.User;
export default mongoose.model("User", userSchema);
