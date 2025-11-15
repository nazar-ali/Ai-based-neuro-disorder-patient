// src/store/useCaretakerStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchCaretakersAPI, createCaretakerAPI } from "@/lib/api";
import { Caretaker } from "@/types/careTaker";



interface CaretakerStore {
  caretakers: Caretaker[];
  loading: boolean;
  error: string | null;

  fetchCaretakers: () => Promise<void>;
  addCaretaker: (payload: { userId: string } & Partial<Caretaker>) => Promise<Caretaker | null>;
  setCaretakers: (c: Caretaker[]) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
}

export const useCaretakerStore = create<CaretakerStore>()(
  persist(
    (set, get) => ({
      caretakers: [],
      loading: false,
      error: null,

      setCaretakers: (c) => set({ caretakers: c }),
      setLoading: (v) => set({ loading: v }),
      setError: (e) => set({ error: e }),

      fetchCaretakers: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetchCaretakersAPI();
          const payload = (res?.data?.data ?? res?.data ?? res) as any;
          const normalized = (payload || []).map((c: any) => {
            const copy = { ...c };
            if (Array.isArray(copy.assignedPatients)) {
              copy.assignedPatients = copy.assignedPatients.map((p: any) =>
                typeof p === "object" ? { _id: p._id, fullName: p.fullName } : p
              );
            }
            return copy;
          });
          set({ caretakers: normalized, loading: false });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          set({ error: message, loading: false });
          console.error("❌ fetchCaretakers error:", message);
        }
      },

      async addCaretaker(payload: { userId: string } & Partial<Caretaker>) {
        try {
          set({ loading: true });
          const res = await createCaretakerAPI(payload);
          const created = res?.data?.data ?? res?.data ?? res;
          await get().fetchCaretakers();
          set({ loading: false });
          return created;
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          set({ error: message, loading: false });
          console.error("❌ addCaretaker error:", message);
          return null;
        }
      },
    }),
    {
      name: "caretaker-store",
      version: 1,
    }
  )
);
