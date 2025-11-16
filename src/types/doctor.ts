export interface CreateDoctorPayload {
  userId: string;
  specialization?: string;
  experienceYears?: number;
  licenseNumber?: string;
  certifications?: Array<{ level: string; body: string; validUntil: string }>;
  assignedPatients?: string[];
}