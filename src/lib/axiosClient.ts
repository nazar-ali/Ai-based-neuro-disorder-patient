"use client";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getAccessToken } from "@/lib/helpers";

const axiosClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------------------------------------
// API WRAPPER (FIXED)
// --------------------------------------------------
const api = {
  get: async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosClient.get(url, config);
      return response.data;
    } catch (error) {
      handleError(error); // always throws
      throw error; // ensures no undefined return
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
      throw error;
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
      throw error;
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
      throw error;
    }
  },

  delete: async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosClient.delete(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

// --------------------------------------------------
// ERROR HANDLER (unchanged except safety improvements)
// --------------------------------------------------
function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status ?? "No Status";
    const errorData = error.response?.data ?? {};
    const requestUrl = error.config?.url ?? "Unknown URL";
    const method = error.config?.method ?? "unknown";

    console.group("❌ API Error");
    console.error("➡️ URL:", requestUrl);
    console.error("➡️ Method:", String(method).toUpperCase());
    console.error("➡️ Status:", statusCode);
    console.error("➡️ Response:", errorData);
    console.groupEnd();

    throw new Error(
      errorData?.error || errorData?.message || `API Error (${statusCode}) at ${requestUrl}`
    );
  }

  if (error instanceof Error) {
    console.error("Unexpected Error:", error.message);
    throw new Error(error.message);
  }

  throw new Error("Unknown error occurred");
}

export default api;
