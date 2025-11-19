import { SignUpFormData } from '@/components/schemas/signupSchema';
import api from '@/lib/axiosClient';
import { RegisterUserPayload } from '@/types/user';
import { PatientPayload } from '@/types/patientFormtypes';
import { CreateDoctorPayload } from '@/types/doctor';
import { Doctor } from '../types';

// ============================================
// AUTH APIs
// ============================================

export async function registerUserAPI(formData: FormData) {
  const res = await api.post("/auth/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!res || (res as any)?.success === false) {
    throw new Error((res as any)?.error || "Faile d to register user");
  }

  return res;
}
  
export async function loginUserAPI({ email, password, role }: { email: string; password: string; role: string }) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
      role
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Network error.",
    };
  }
}







export const uploadProfileImage = async (formData: FormData) => {
  try {
    const response = await api.post('/upload-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// ============================================
// USER APIs
// ============================================

export async function createUserAPI(payload: {
  fullName: string;
  email: string;
  password: string;
  role: 'doctor' | 'caretaker' | 'patient' | 'admin';
}) {
  const response = await api.post('/users', payload);
  return response;
}

export async function getUsersAPI(role?: string) {
  const response = await api.get(`/users${role ? `?role=${role}` : ''}`);
  return response;
}

// ============================================
// DOCTOR APIs
// ============================================

export async function createDoctorAPI(payload: CreateDoctorPayload) {
  const response = await api.post('/doctors', payload);
  return response;
}

export async function fetchDoctorsAPI() {
  const response = await api.get('/doctors');
  return response;
}

export async function deleteDoctorAPI(doctorId: string) {
  const response = await api.delete(`/doctors/${doctorId}`);
  return response;
}

export async function updateDoctorAPI(doctorId: string, payload: Partial<Doctor>) {
  const response = await api.put(`/doctors/${doctorId}`, payload);
  return response;
}

// ============================================
// PATIENT APIs
// ============================================

export async function createPatientAPI(payload: PatientPayload) {
  const response = await api.post('/patients', payload);
  return response;
}

export async function fetchPatientsAPI() {
  const response = await api.get('/patients');
  console.log("Fetched patients:", response.data);
  return response;
}

export async function deletePatientAPI(patientId: string) {
  const response = await api.delete(`/patients/${patientId}`);
  return response;
}

export async function updatePatientAPI(patientId: string, payload: Partial<PatientPayload>) {
  const response = await api.put(`/patients/${patientId}`, payload);
  return response;
}

// ============================================
// CARETAKER APIs
// ============================================

export async function createCaretakerAPI(payload: {
  userId: string;
  specialization?: string;
  experience?: number;
  licenseNumber?: string;
}) {
  const response = await api.post('/caretakers', payload);
  return response;
}

export async function fetchCaretakersAPI() {
  const response = await api.get('/caretakers');
  return response;
}

export async function deleteCaretakerAPI(caretakerId: string) {
  const response = await api.delete(`/caretakers/${caretakerId}`);
  return response;
}

export async function updateCaretakerAPI(caretakerId: string, payload: any) {
  const response = await api.put(`/caretakers/${caretakerId}`, payload);
  return response;
}

