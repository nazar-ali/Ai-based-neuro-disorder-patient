

export interface DoctorScheduleItem {
  day: string;
  start: string;
  end: string;
}

export interface Doctor {
  userId: string;                        // ObjectId as string
  fullName: string;
  email: string;
  specialization: string;
  experience: number;
  assignedPatients: string[];            // ObjectId[] → string[]
  schedule: DoctorScheduleItem[];
}

export interface CreateDoctorPayload {
  userId: string;                        // Required in payload
  fullName: string;
  email: string;
  specialization: string;
  experience: number;
  assignedPatients: string[];            // Required
  schedule?: DoctorScheduleItem[];       // Optional
}

export interface DoctorStoreState {
  doctors: Doctor[];
  setDoctors: (docs: Doctor[]) => void;
  addDoctor: (doctor: CreateDoctorPayload) => Promise<any>;
}
