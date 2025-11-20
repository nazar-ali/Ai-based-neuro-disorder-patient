import { SignUpFormData } from '@/components/schemas/signupSchema';
import api from '@/lib/axiosClient';
import { RegisterUserPayload } from '@/types/user';
import { PatientPayload } from '@/types/patientFormtypes';
import { CreateDoctorPayload } from '@/types/doctor';
import { Doctor } from '../types';
import { success } from 'zod';
import { toast } from 'sonner';

// ============================================
// AUTH APIs
// ============================================

export async function registerUserAPI(formData: FormData) {
  try {
    const res = await api.post("/auth/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = res.data;

    // Backend always returns success + data object
    if (!data?.success) {
      toast.error("Failed to register user");
    }

    return {
      success: true,
      message: data?.message,
      user: data?.user,
      accessToken: data?.user?.accessToken,
    };

  } catch (error: any) {
    console.log("Signup error:", error);
    throw new Error(
      error.response?.data?.error || error.message || "Signup request failed"
    );
  }
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

