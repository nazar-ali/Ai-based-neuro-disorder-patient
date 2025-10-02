'use client';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from '@/lib/helpers';

const axiosClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// ✅ Add interceptor for content type
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Only set JSON if not FormData
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);



// ✅ Generic API wrapper with proper typing
const api = {
  get: async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosClient.get(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  post: async <T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosClient.post(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  put: async <T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosClient.put(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  patch: async <T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosClient.patch(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  delete: async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosClient.delete(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// ✅ Type-safe error handler
function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const errorData = error.response?.data;

    console.error("API Error:", {
      status: statusCode,
      data: errorData,
      url: error.config?.url,
      method: error.config?.method,
    });

    throw {
      errorCode: statusCode,
      errorMessage:
        (errorData as any)?.error ||
        (errorData as any)?.message ||
        JSON.stringify(errorData) || // 👈 log raw data if not standard
        "API Error",
    };
  } else if (error instanceof Error) {
    console.error("Unexpected Error:", error.message);
    throw new Error(error.message);
  }

  throw new Error("Unknown error occurred.");
}


export default api;
