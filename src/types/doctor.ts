export interface DoctorCertification {
  level: string;
  body: string;
  validUntil: string; // always stored as string
}

export interface Doctor {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  certifications?: DoctorCertification[];
}

export interface CreateDoctorPayload {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  certifications?: DoctorCertification[];
}

export interface DoctorStoreState {
  doctors: Doctor[];
  setDoctors: (docs: Doctor[]) => void;
  addDoctor: (doctor: CreateDoctorPayload) => void;
}