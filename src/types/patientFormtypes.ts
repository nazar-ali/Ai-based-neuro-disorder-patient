// src/types/formTypes.ts

export interface EmergencyContact {
  name: string;
  relation: string;
  contact: string;
  isPrimary: boolean;
}


export interface Demographics {
  age: number;
  sex: string;
  height: number;
  weight: number;
}


export interface PatientForm {
  medicalRecordsId: string;
  consent_dataSharing: boolean;
  emergencyContacts: EmergencyContact[];
  demographics: Demographics;
  careTeam_doctors: string[];
  careTeam_caretakers: string[];
  allergies: string[];
  medicalHistory: string[];
  assignedDoctor?: string;
  assignedCaretaker?: string | null;
  fullName: string;
}


export interface PatientInfoProps {
  form: PatientForm;
  setForm: React.Dispatch<React.SetStateAction<PatientForm>>;
}



export interface PatientPayload {
  fullName: string;
  medicalRecordsId?: string;

  // demographics
  demographics?: {
    age: number;
    sex: string;
    height: number;
    weight: number;
  };

  medicalHistory?: string[];
  allergies?: string[];
  
  assignedDoctor?: string;
  assignedCaretaker?: string | null;

  careTeam_doctors?: string[];
  careTeam_caretakers?: string[];

  emergencyContacts?: {
    name: string;
    relation: string;
    contact: string;
    isPrimary?: boolean;
  }[];

  consent_dataSharing?: boolean;

  userId?: string;
}

export interface Patient {
  _id: string;
  fullName: string;

  medicalRecordsId: string;

  demographics: {
    age: number;
    sex: string;
    height: number;
    weight: number;
  };

  medicalHistory: string[];
  allergies: string[];

  assignedDoctor: string | null;
  assignedCaretaker: string | null;

  careTeam_doctors: string[];
  careTeam_caretakers: string[];

  emergencyContacts: EmergencyContact[];

  consent_dataSharing: boolean;

  createdAt: string;
  updatedAt: string;
}

// export interface PatientRow {
//   _id: string;
//   fullName?: string;
//   mriRecordId?: string;
//   assignedDoctor?: {
//     _id?: string;
//     fullName?: string;
//     email?: string;
//   } | string | null;
//   assignedCaretaker?: {
//     _id?: string;
//     fullName?: string;
//     email?: string;
//   } | string | null;
// }


export interface PatientRow {
  _id: string;
  fullName: string;
  medicalRecordsId: string;

  assignedDoctor?: string | { _id: string; fullName?: string } | null;
  assignedCaretaker?: string | { _id: string; fullName?: string } | null;

  allergies?: string[];

  emergencyContacts?: Array<{
    name: string;
    relation: string;
    contact: string;
    isPrimary?: boolean;
  }>;

  demographics?: {
    age?: number;
    sex?: string;
    height?: number;
    weight?: number;
  };
}

