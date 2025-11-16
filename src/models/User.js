import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // important for security
    },

    role: {
      type: String,
      enum: ["admin", "doctor", "patient", "caretaker"],
      // default: "patient",
      required: true,
    },

    profileImageUrl: {
      type: String,
      default: "",
    },

    // -------------------------------------------------
    // 🔗 Role-based assignments (your original logic)
    // -------------------------------------------------

    // Patient → assigned to Doctor
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // a doctor user
      default: null,
    },

    // Patient → assigned to Caretaker
    assignedCaretaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // a caretaker user
      default: null,
    },

    // Doctor/Caretaker → list of Patients
    assignedPatients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // each item is a patient user
      },
    ],
  },
  { timestamps: true }
);



// -------------------------------------------------
// 🔐 PASSWORD HASHING (only when modified)
// -------------------------------------------------
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});


// -------------------------------------------------
// 📌 Password comparison method
// -------------------------------------------------
UserSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};



// -------------------------------------------------
// 🛡 Prevent Model Overwrite Error
// -------------------------------------------------
export default mongoose.models.User || mongoose.model("User", UserSchema);
