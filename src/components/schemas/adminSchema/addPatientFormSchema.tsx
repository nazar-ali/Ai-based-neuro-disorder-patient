import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ----------------------- SCHEMA ----------------------- */
const EmergencySchema = z.object({
  name: z.string().min(1, "Name is required"),
  relation: z.string().min(1, "Relation is required"),
  contact: z.string().min(1, "Contact number is required"),
});

export const PatientSchema = z.object({
  medicalRecordsId: z.string().min(1, "Medical Record ID is required"),
  fullName: z.string().min(1, "Full Name is required"),

  age: z.string().optional(),
  sex: z.string().optional(),
  ethnicity: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  medicalHistory: z.string().optional(),
  allergies: z.string().optional(),

  contact: z.string().min(1, "Contact number is required"),

  assignedDoctor: z.string().optional(),
  assignedCaretaker: z.string().optional(),
  careTeam_doctors: z.string().optional(),
  careTeam_caretakers: z.string().optional(),

  consent_dataSharing: z.boolean().optional(),

  emergencyContacts: z.array(EmergencySchema),
});

/* ----------------------- RESOLVER ----------------------- */
export type PatientFormType = z.infer<typeof PatientSchema>
