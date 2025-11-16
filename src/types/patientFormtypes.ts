// src/types/formTypes.ts

export interface EmergencyContact {
  name: string;
  relation: string;
  contact: string;
  isPrimary: boolean;
}

export interface Demographics {
  age: string;
  sex: string;
  ethnicity: string;
  weight: string;
  height: string;
}

export interface PatientForm {
  medicalRecordsId: string;
  consent_dataSharing: boolean;
  emergencyContacts: EmergencyContact[];
  demographics: Demographics;
  careTeam_doctors: string[];
  careTeam_caretakers: string[];
}

export interface PatientInfoProps {
  form: PatientForm;
  setForm: React.Dispatch<React.SetStateAction<PatientForm>>;
}



export interface PatientPayload {
  fullName: string;
  medicalRecordsId?: string;
  age?: string;
  sex?: string;
  ethnicity?: string;
  weight?: string;
  height?: string;
  medicalHistory?: string[];
  allergies?: string[];
  contact?: string;
  assignedDoctor?: string;
  assignedCaretaker?: string;
  careTeam_doctors?: string[];
  careTeam_caretakers?: string[];
  emergencyContacts?: Array<{
    name: string;
    relation: string;
    contact: string;
    isPrimary?: boolean;
  }>;
  consent_dataSharing?: boolean;
  userId?: string;
}

export interface Patient {
  _id: string;
  mriRecordId?: string;
  fullName: string;
  email?: string;
  assignedDoctor?: { _id: string; fullName?: string } | string | null;
  assignedCaretaker?: { _id: string; fullName?: string } | string | null;
  patientSummary?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PatientRow {
  _id: string;
  fullName?: string;
  mriRecordId?: string;
  assignedDoctor?: {
    _id?: string;
    fullName?: string;
    email?: string;
  } | string | null;
  assignedCaretaker?: {
    _id?: string;
    fullName?: string;
    email?: string;
  } | string | null;
}


