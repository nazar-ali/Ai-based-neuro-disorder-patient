import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchDoctorsAPI, deleteDoctorAPI } from "@/lib/api";

export interface Doctor {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  specialization?: string;
  licenseNumber?: string;
  experienceYears?: number;
  certifications?: Array<{
    level: string;
    body: string;
    validUntil?: Date;
  }>;
  assignedPatients?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface DoctorStore {
  doctors: Doctor[];
  currentDoctor: Doctor | null;
  loading: boolean;
  error: string | null;

  // Actions
  addDoctor: (doctor: Doctor) => void;
  setDoctors: (doctors: Doctor[]) => void;
  setCurrentDoctor: (doctor: Doctor | null) => void;
  removeDoctor: (doctorId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;
  fetchDoctors: () => Promise<void>;
  deleteDoctor: (doctorId: string) => Promise<boolean>;
}

export const useDoctorStore = create<DoctorStore>()(
  persist(
    (set) => ({
      doctors: [],
      currentDoctor: null,
      loading: false,
      error: null,

      addDoctor: (doctor: Doctor) =>
        set((state) => ({
          doctors: [...state.doctors, doctor],
          currentDoctor: doctor,
        })),

      setDoctors: (doctors: Doctor[]) =>
        set({
          doctors,
        }),

      setCurrentDoctor: (doctor: Doctor | null) =>
        set({
          currentDoctor: doctor,
        }),

      removeDoctor: (doctorId: string) =>
        set((state) => ({
          doctors: state.doctors.filter((d) => d._id !== doctorId),
          currentDoctor: state.currentDoctor?._id === doctorId ? null : state.currentDoctor,
        })),

      setLoading: (loading: boolean) =>
        set({
          loading,
        }),

      setError: (error: string | null) =>
        set({
          error,
        }),

      clearStore: () =>
        set({
          doctors: [],
          currentDoctor: null,
          loading: false,
          error: null,
        }),

      fetchDoctors: async () => {
        set({ loading: true, error: null });
        try {
          const data = await fetchDoctorsAPI();
          // Normalize doctors so UI always has top-level fullName and email
          const normalized = (data.data || []).map((d: any) => {
            const copy = { ...d };
            if (copy.userId && typeof copy.userId === 'object') {
              copy.fullName = copy.userId.fullName || copy.fullName;
              copy.email = copy.userId.email || copy.email;
            }
            // ensure experienceYears exists for UI
            copy.experienceYears = copy.experienceYears ?? copy.experience ?? undefined;
            return copy;
          });
          set({
            doctors: normalized,
            loading: false,
          });
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : "Unknown error";
          console.error("❌ Error fetching doctors:", errorMsg);
          set({
            error: errorMsg,
            loading: false,
          });
        }
      },

      deleteDoctor: async (doctorId: string) => {
        try {
          await deleteDoctorAPI(doctorId);
          // Remove from store
          set((state) => ({
            doctors: state.doctors.filter((d) => d._id !== doctorId),
            currentDoctor: state.currentDoctor?._id === doctorId ? null : state.currentDoctor,
          }));
          return true;
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : "Unknown error";
          console.error("❌ Error deleting doctor:", errorMsg);
          set({ error: errorMsg });
          return false;
        }
      },
    }),
    {
      name: "doctor-store", // localStorage key
      version: 1,
    }
  )
);
