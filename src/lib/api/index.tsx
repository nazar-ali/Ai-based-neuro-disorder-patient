import { SignUpFormData } from '@/components/schemas/signupSchema';
import api from '@/lib/axiosClient';
import { RegisterUserPayload } from '@/types/user';

export const registerUserAPI = async (payload: RegisterUserPayload) => {
  try {
    const response = await api.post("/auth/signup", payload);
    return response?.data;
  } catch (error) {
    throw error;
  }
};




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
