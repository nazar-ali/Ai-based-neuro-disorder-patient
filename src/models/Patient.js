import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  medicalRecordsId: { type: String },
  
  userId: { 
    type: String,
    // Optional: support non-ObjectId user identifiers
  },

  demographics: {
    age: Number,
    sex: String,
    height: Number,
    weight: Number,
  },

  medicalHistory: Array,
  allergies: [String],

  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    default: null,
  },

  assignedCaretaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Caretaker",
    default: null,
  },

  emergencyContacts: [
    {
      name: String,
      relation: String,
      contact: String,
      isPrimary: Boolean,
    },
  ],

  consent_dataSharing: { type: Boolean, default: false },

  careTeam_doctors: [{ type: String }],
  careTeam_caretakers: [{ type: String }],

  reports: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Report" }
  ],
}, { 
  timestamps: true
});

export default mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
