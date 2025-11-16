import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  // Support non-Mongo IDs (string) for userId
  userId: { type: String, required: true },
  // Optional user info fields (useful when not linking to a separate User collection)
  fullName: { type: String },
  email: { type: String },

  specialization: String,
  experience: Number,

  assignedPatients: [
    // Patients are represented as users (role: 'patient') in this app
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  schedule: [
    {
      day: String,
      start: String,
      end: String,
    }
  ],
});

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
