// src/store/usePatientStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchPatientsAPI, createPatientAPI } from "@/lib/api";
import { Patient, PatientPayload } from "@/types/patientFormtypes";


interface PatientStore {
  patients: Patient[];
  loading: boolean;
  error: string | null;

  fetchPatients: () => Promise<void>;
  addPatient: (payload: PatientPayload) => Promise<Patient | null>;
  setPatients: (patients: Patient[]) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
}

export const usePatientStore = create<PatientStore>()(
  persist(
    (set, get) => ({
      patients: [],
      loading: false,
      error: null,

      setPatients: (patients) => set({ patients }),
      setLoading: (v) => set({ loading: v }),
      setError: (e) => set({ error: e }),

      fetchPatients: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetchPatientsAPI();
          // expected structure: { success:true, data: { data: [...] } } or adapt to your API
          const payload = (res?.data?.data ?? res?.data ?? res) as any;
          const normalized = (payload || []).map((p: any) => {
            const copy = { ...p };
            // normalize nested relations
            if (copy.assignedDoctor && typeof copy.assignedDoctor === "object") {
              copy.assignedDoctor = {
                _id: copy.assignedDoctor._id,
                fullName: copy.assignedDoctor.fullName || copy.assignedDoctor.email,
              };
            }
            if (copy.assignedCaretaker && typeof copy.assignedCaretaker === "object") {
              copy.assignedCaretaker = {
                _id: copy.assignedCaretaker._id,
                fullName: copy.assignedCaretaker.fullName || copy.assignedCaretaker.email,
              };
            }
            return copy;
          });
          set({ patients: normalized, loading: false });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          set({ error: message, loading: false });
          console.error("❌ fetchPatients error:", message);
        }
      },

      addPatient: async (payload: PatientPayload) => {
        try {
          set({ loading: true });
          const res = await createPatientAPI(payload);
          console.log("createPatientAPI response:", res);
          // assume res.data.data is created patient or adapt
          const newPatient = res?.data?.data ?? res?.data ?? res;
          await get().fetchPatients();
          set({ loading: false });
          return newPatient;
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          set({ error: message, loading: false });
          console.error("❌ addPatient error:", message);
          return null;
        }
      },
    }),
    {
      name: "patient-store",
      version: 1,
    }
  )
);
