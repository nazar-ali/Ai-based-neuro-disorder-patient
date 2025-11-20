export interface AssignedUser {
  _id: string;
  fullName: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  contact: string;
  isPrimary: boolean;
}


export interface Patient {
  _id: string;
  fullName: string;

  medicalRecordsId?: string;

  userId?: string;

  demographics: {
    age: number;
    sex: string;
    height: number;
    weight: number;
  };

  medicalHistory: string[];
  allergies: string[];

  assignedDoctor: string | AssignedUser | null;
  assignedCaretaker: string | AssignedUser | null;

  emergencyContacts: EmergencyContact[];

  consent_dataSharing: boolean;

  careTeam_doctors: string[];
  careTeam_caretakers: string[];

  reports: string[];

  createdAt: string;
  updatedAt: string;
}

export interface PatientForm {
  _id?: string;
  userId?: string;

  fullName: string;
  medicalRecordsId?: string;

  demographics: {
    age: number;
    sex: string;
    height: number;
    weight: number;
  };

  medicalHistory: string[];
  allergies: string[];

  assignedDoctor?: AssignedUser | string | null;
  assignedCaretaker?: AssignedUser | string | null;

  emergencyContacts: EmergencyContact[];

  consent_dataSharing: boolean;

  careTeam_doctors: string[];
  careTeam_caretakers: string[];

  reports?: string[];

  createdAt?: string;
  updatedAt?: string;
}

export interface PatientRow {
  _id: string;
  fullName: string;

  // FIX — optional instead of required
  medicalRecordsId?: string;  

  assignedDoctor: string | AssignedUser | null;  
  assignedCaretaker: string | AssignedUser | null;

  allergies: string[];
  emergencyContacts: EmergencyContact[];
}

export interface PatientPayload {
  fullName: string;
  medicalRecordsId?: string;

  userId: string;

  demographics?: {
    age?: number;
    sex?: string;
    height?: number;
    weight?: number;
  };

  medicalHistory?: string[];
  allergies?: string[];

  assignedDoctor?: string | null;
  assignedCaretaker?: string | null;

  emergencyContacts?: EmergencyContact[];

  consent_dataSharing?: boolean;

  careTeam_doctors?: string[];
  careTeam_caretakers?: string[];

  reports?: string[];
}
