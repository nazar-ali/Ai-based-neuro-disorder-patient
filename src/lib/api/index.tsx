import { SignUpFormData } from '@/components/schemas/signupSchema';
import api from '@/lib/axiosClient';
import { RegisterUserPayload } from '@/types/user';

export async function registerUserAPI(formData: FormData) {
  
  const res = await api.post("/auth/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!res || (res as any)?.success === false) {
    throw new Error((res as any)?.error || "Failed to register user");
  }

  return res;
}
export async function loginUserAPI(payload: { email: string; password: string }) {
  try {
    const response = await api.post("/auth/login", payload);

    // Axios returns { data, status, ... }
    if (response?.data) {
      return {
        success: true,
        data: response.data, // includes { message, user, accessToken }
      };
    }

    return { success: false, error: "Unexpected response" };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Network error. Try again.",
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
};
