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
