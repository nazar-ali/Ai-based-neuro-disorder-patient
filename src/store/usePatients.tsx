// src/store/usePatientStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/axiosClient";
import { Patient, PatientPayload } from "@/types/patientFormtypes";

interface PatientStore {
  patients: Patient[];
  patientLoading: boolean;
  error: string | null;

  fetchPatients: () => Promise<Patient[] | null>;
  addPatient: (payload: PatientPayload) => Promise<Patient | null>;
  updatePatient: (patientId: string, payload: Partial<PatientPayload>) => Promise<Patient | null>;
  deletePatient: (patientId: string) => Promise<boolean>;

  setPatients: (patients: Patient[]) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
}

/** ----------------------------------------
 * Normalizer for backend response
 * ---------------------------------------- */
const normalizePatient = (p: any): Patient => {
  const copy: any = { ...p };

  // Normalize assigned doctor
  if (copy.assignedDoctor && typeof copy.assignedDoctor === "object") {
    copy.assignedDoctor = {
      _id: copy.assignedDoctor._id,
      fullName:
        copy.assignedDoctor.fullName ||
        copy.assignedDoctor.email ||
        "Unknown Doctor",
    };
  }

  // Normalize assigned caretaker
  if (copy.assignedCaretaker && typeof copy.assignedCaretaker === "object") {
    copy.assignedCaretaker = {
      _id: copy.assignedCaretaker._id,
      fullName:
        copy.assignedCaretaker.fullName ||
        copy.assignedCaretaker.email ||
        "Unknown Caretaker",
    };
  }

  return copy as Patient;
};

/** ----------------------------------------
 * Zustand Store
 * ---------------------------------------- */
export const usePatientStore = create<PatientStore>()(
  persist(
    (set, get) => ({
      patients: [],
      patientLoading: false,
      error: null,

      setPatients: (patients) => set({ patients }),
      setLoading: (v) => set({ patientLoading: v }),
      setError: (e) => set({ error: e }),

      /** ----------------------------------------
       * FETCH ALL PATIENTS
       * ---------------------------------------- */
      fetchPatients: async () => {
        set({ patientLoading: true, error: null });
        try {
          const res = await api.get("/patients");

          const data =
            res?.data?.data ??
            res?.data ??
            res;

          const list = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
            ? data.data
            : [];

          const normalized = list.map((p: any) => normalizePatient(p));

          set({ patients: normalized, patientLoading: false });
          return normalized;
        } catch (err: any) {
          const message =
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            err?.message ||
            "Failed to fetch patients";

          console.error("FETCH PATIENTS ERROR:", message);
          set({ error: message, patientLoading: false });
          return null;
        }
      },

      /** ----------------------------------------
       * ADD PATIENT
       * ---------------------------------------- */
      addPatient: async (payload) => {
        set({ patientLoading: true, error: null });

        try {
          const res = await api.post("/patients", payload);
          const created = normalizePatient(res?.data?.data ?? res?.data ?? res);

          // Add optimistically without refetch
          set({
            patients: [...get().patients, created],
            patientLoading: false,
          });

          return created;
        } catch (err: any) {
          const message =
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            err?.message ||
            "Failed to add patient";

          console.error("ADD PATIENT ERROR:", message);
          set({ error: message, patientLoading: false });
          return null;
        }
      },

      /** ----------------------------------------
       * UPDATE PATIENT
       * ---------------------------------------- */
      updatePatient: async (patientId, payload) => {
        set({ patientLoading: true, error: null });

        try {
          const res = await api.put(`/patients/${patientId}`, payload);
          const updated = normalizePatient(
            res?.data?.data ?? res?.data ?? res
          );

          // Update optimistically in local store
          set({
            patients: get().patients.map((p) =>
              p._id === patientId ? updated : p
            ),
            patientLoading: false,
          });

          return updated;
        } catch (err: any) {
          const message =
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            err?.message ||
            "Failed to update patient";

          console.error("UPDATE PATIENT ERROR:", message);
          set({ error: message, patientLoading: false });
          return null;
        }
      },

      /** ----------------------------------------
       * DELETE PATIENT
       * ---------------------------------------- */
      deletePatient: async (patientId) => {
        set({ patientLoading: true, error: null });

        try {
          await api.delete(`/patients/${patientId}`);

          set({
            patients: get().patients.filter((p) => p._id !== patientId),
            patientLoading: false,
          });

          return true;
        } catch (err: any) {
          const message =
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            err?.message ||
            "Failed to delete patient";

          console.error("DELETE PATIENT ERROR:", message);
          set({ error: message, patientLoading: false });
          return false;
        }
      },
    }),
    {
      name: "patient-store",
      version: 2, // updated version for safer migration
    }
  )
);
