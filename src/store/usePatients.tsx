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

/* ----------------------------------------
 * Normalize Patient Data
 * ---------------------------------------- */
const normalizePatient = (p: any): Patient => {
  const copy: any = { ...p };

  if (copy.assignedDoctor && typeof copy.assignedDoctor === "object") {
    copy.assignedDoctor = {
      _id: copy.assignedDoctor._id,
      fullName:
        copy.assignedDoctor.fullName ||
        copy.assignedDoctor.email ||
        "Unknown Doctor",
    };
  }

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

/* ----------------------------------------
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

      /* ----------------------------------------
       * GET ALL PATIENTS
       * ---------------------------------------- */
      fetchPatients: async () => {
  try {
    set({ patientLoading: true, error: null });

    const res = await api.get("/patients");
    const data = res;  // FIXED

    console.log("Fetched patients:", data);

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch patients");
    }

    // Your backend returns:  { success: true, patients: [...] }
      const normalized = data.patient
      ? [normalizePatient(data.patient)] // convert object → array
      : [];

    set({ patients: normalized });

    return normalized;
  } catch (err: any) {
    set({ error: err.message });
    return null;
  } finally {
    set({ patientLoading: false });
  }
},


      /* ----------------------------------------
       * ADD PATIENT
       * ---------------------------------------- */
      addPatient: async (payload) => {
        try {
          set({ patientLoading: true, error: null });

          const res = await api.post("/patients", payload);
          const created = normalizePatient(res.data.data);

          set({
            patients: [...get().patients, created],
            patientLoading: false,
          });

          return created;
        } catch (err: any) {
          set({
            error:
              err?.response?.data?.error ||
              err?.response?.data?.message ||
              err.message,
          });
          return null;
        } finally {
          set({ patientLoading: false });
        }
      },

      /* ----------------------------------------
       * UPDATE PATIENT
       * ---------------------------------------- */
      updatePatient: async (patientId, payload) => {
        try {
          set({ patientLoading: true, error: null });

          const res = await api.put(`/patients/${patientId}`, payload);
          const updated = normalizePatient(res.data.data);

          set({
            patients: get().patients.map((p) =>
              p._id === patientId ? updated : p
            ),
          });

          return updated;
        } catch (err: any) {
          set({
            error:
              err?.response?.data?.error ||
              err?.response?.data?.message ||
              err.message,
          });
          return null;
        } finally {
          set({ patientLoading: false });
        }
      },

      /* ----------------------------------------
       * DELETE PATIENT
       * ---------------------------------------- */
      deletePatient: async (patientId) => {
        try {
          set({ patientLoading: true, error: null });

          await api.delete(`/patients/${patientId}`);

          set({
            patients: get().patients.filter((p) => p._id !== patientId),
          });

          return true;
        } catch (err: any) {
          set({
            error:
              err?.response?.data?.error ||
              err?.response?.data?.message ||
              err.message,
          });
          return false;
        } finally {
          set({ patientLoading: false });
        }
      },
    }),

    /* ----------------------------------------
     * Persist Config
     * ---------------------------------------- */
    {
      name: "patient-store",
      version: 4, // new version

      migrate: (persistedState: any, version) => {
        console.log("Migrating patient store → from version", version);

        if (version < 4) {
          return {
            patients: [],
            patientLoading: false,
            error: null,
          };
        }

        return persistedState;
      },
    }
  )
);
