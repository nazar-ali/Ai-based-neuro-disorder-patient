export type UserRole = 'admin' | 'doctor' | 'patient' | 'caretaker';

export interface User {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor extends User {
  id:string,
  role: 'doctor';
  specialization?: string;
  licenseNumber?: string;
  assignedPatients?: string[];
  schedule?: Schedule[];
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: string;
  medicalHistory?: string[];
  allergies?: string[];
  assignedDoctor?: string | Doctor;
  assignedCaretaker?: string | Caretaker;
  appointments?: string[];
}

export interface Caretaker extends User {
  role: 'caretaker';
  assignedPatient?: string | Patient;
  relationship?: string;
}

export interface Schedule {
  _id?: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Appointment {
  _id: string;
  patientId: string | Patient;
  doctorId: string | Doctor;
  dateTime: string;
  reason: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  _id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  medication: string;
  dosage: string;
  duration: string;
  instructions?: string;
  createdAt: string;
}

export interface DoctorNote {
  _id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  notes: string;
  recommendations?: string;
  createdAt: string;
}

export interface Vitals {
  _id: string;
  patientId: string;
  caretakerId: string;
  bloodPressure: string;
  temperature: number;
  pulse: number;
  sugarLevel?: number;
  recordedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}
