import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    // ROLE WITHOUT "pending"
    role: {
      type: String,
      enum: ["admin", "doctor", "patient", "caretaker"],
      required: true,
    },

    profileImageUrl: {
      type: String,
      default: "",
    },

    rejectionReason:{
type:String,
reason:String,
default:""
    },
    // SEPARATE ACCOUNT APPROVAL STATUS
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
