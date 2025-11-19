"use client";

import { create, StateCreator } from "zustand";
import api from "@/lib/axiosClient";
import { Doctor } from "@/types/doctor";

// ==================================================
// 📌 Types
// ==================================================



interface DoctorStore {
  doctors: Doctor[];
  doctor: Doctor | null;
  selectedDoctor: Doctor | null;
  loading: boolean;
  error?: string | null;

  addDoctor: (
    formData: Doctor
  ) => Promise<{ success: boolean; message?: string }>;

  viewDoctor: (
    id: string
  ) => Promise<{ success: boolean; message?: string }>;

  getAllDoctors: () => Promise<void>;

  deleteDoctor: (
    id: string
  ) => Promise<{ success: boolean; message?: string }>;

  setSelectedDoctor: (doctor: Doctor | null) => void;
}

// ==================================================
// 📌 Store Creator
// ==================================================

const doctorStore: StateCreator<DoctorStore> = (set, get) => ({
  doctors: [],
  doctor: null,
  selectedDoctor: null,
  loading: false,
  error: null,

  // ==================================================
  // ➤ Add doctor
  // ==================================================
  addDoctor: async (formData:Doctor) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/doctors", formData);

      if (res.success) {
        set((state) => ({
          doctors: [...state.doctors, res.data],
          loading: false,
        }));

        return { success: true, message: res.message };
      }

      set({ loading: false, error: res.message });
      return { success: false, message: res.message };
    } catch (err: any) {
      set({ loading: false, error: err.message });
      return { success: false, message: err.message };
    }
  },

  // ==================================================
  // ⭐ Set Selected Doctor (for modals)
  // ==================================================
  setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),

  // ==================================================
  // ➤ View doctor (GET ONE)
  // ==================================================
  viewDoctor: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const res = await api.get(`/doctors/${id}`);

      if (!res.success) {
        return { success: false, message: res.message };
      }

      set({ selectedDoctor: res.doctor });
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      set({ loading: false });
    }
  },

  // ==================================================
  // ➤ Get ALL doctors
  // ==================================================
  getAllDoctors: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/doctors");
        console.log("getAllDoctors res:", res);
      if (res.success) {
        set({ doctors: res.data });
      }
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // ==================================================
  // ➤ Delete doctor
  // ==================================================
  deleteDoctor: async (id: string) => {
    try {
      const res = await api.delete(`/doctors/${id}`);

      if (!res.success) {
        return { success: false, message: res.message };
      }

      set({
        doctors: get().doctors.filter((d) => d.userId !== id),
      });

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  },
});

// ==================================================
// 📌 Export Store
// ==================================================

export const useDoctorStore = create<DoctorStore>()(doctorStore);
