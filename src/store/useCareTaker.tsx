"use client";

import { create, StateCreator } from "zustand";
import api from "@/lib/axiosClient";
import { Caretaker } from "@/types/careTaker";

// ==================================================
// 📌 Types
// ==================================================



interface CaretakerStore {
  caretakers: Caretaker[];
  caretaker: Caretaker | null;
  selectedCaretaker: Caretaker | null;
  caretakerLoading: boolean;
  error?: string | null;

  addCaretaker: (
    formData: Caretaker
  ) => Promise<{ success: boolean; message?: string }>;

  viewCaretaker: (
    userId: string
  ) => Promise<{ success: boolean; message?: string }>;

  getAllCaretakers: () => Promise<void>;

  deleteCaretaker: (
    id: string
  ) => Promise<{ success: boolean; message?: string }>;

  // ⭐ ADDED THIS IN INTERFACE
  setSelectedCaretaker: (caretaker: Caretaker | null) => void;
}

// ==================================================
// 📌 Store Creator
// ==================================================

const caretakerStore: StateCreator<CaretakerStore> = (set, get) => ({
  caretakers: [],
  caretaker: null,
  selectedCaretaker: null,
  caretakerLoading: false,
  error: null,

  // ==================================================
  // ➤ Add caretaker
  // ==================================================
  addCaretaker: async (formData) => {
    set({ caretakerLoading: true, error: null });

    try {
      const res = await api.post("/caretaker", formData);
      console.log("Add Caretaker Response:", res.caretaker);
    

      if (res.success) {
        set((state) => ({
          caretakers: [...state.caretakers, res.caretaker],
          caretakerLoading: false,
        }));

        return { success: true, message: res.message };
      }

      set({ caretakerLoading: false, error: res.message });
      return { success: false, message: res.message };
    } catch (err: any) {
      set({ caretakerLoading: false, error: err.message });
      return { success: false, message: err.message };
    }
  },

  // ==================================================
  // ⭐ Set Selected Caretaker (for modals)
  // ==================================================
  setSelectedCaretaker: (caretaker) => set({ selectedCaretaker: caretaker }),

  // ==================================================
  // ➤ View caretaker (GET one)
  // ==================================================
  viewCaretaker: async (id: string) => {
    set({ caretakerLoading: true, error: null });

    try {
      const res = await api.get(`/caretaker/${id}`);
    

      if (!res.success) {
        return { success: false, message: res.message };
      }

      set({ selectedCaretaker: res.caretaker });
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    } finally {
      set({ caretakerLoading: false });
    }
  },

  // ==================================================
  // ➤ Get ALL caretakers
  // ==================================================
  getAllCaretakers: async () => {
    set({ caretakerLoading: true, error: null });

    try {
      const res = await api.get("/caretaker");

      if (res.success) {
        set({ caretakers: res.caretakers });
      }
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ caretakerLoading: false });
    }
  },

  // ==================================================
  // ➤ Delete caretaker
  // ==================================================
  deleteCaretaker: async (id: string) => {
    try {
      const res = await api.delete(`/caretaker/${id}`);
  

      if (!res.success) {
        return { success: false, message: res.message };
      }

      set({
        caretakers: get().caretakers.filter((c) => c._id !== id),
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

export const useCaretakerStore = create<CaretakerStore>()(caretakerStore);
