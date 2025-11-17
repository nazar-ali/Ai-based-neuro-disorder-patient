// models/Caretaker.js
import mongoose from "mongoose";

const CaretakerSchema = new mongoose.Schema(
  {
    userId: { 
      type: String, 
      required: true 
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true
    },

    contactNo: {
      type: String,
      required: true,
    },

    assignedPatients: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Patient" 
      }
    ],

  },
  { timestamps: true }
);

export default mongoose.models.Caretaker || mongoose.model("Caretaker", CaretakerSchema);
