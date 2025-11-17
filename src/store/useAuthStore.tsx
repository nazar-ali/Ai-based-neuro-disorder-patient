// src/store/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  userId: string | null;
  role: string | null;
  token: string | null;

  setAuth: (data: { userId: string; role: string; token: string }) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  role: null,
  token: null,

  hydrate: () => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("auth");
      if (raw) {
        try {
          const saved = JSON.parse(raw);
          set(saved);
        } catch {
          localStorage.removeItem("auth");
        }
      }
    }
  },

  setAuth: (data) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(data));
    }
    set(data);
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth");
    }
    set({ userId: null, role: null, token: null });
  },
}));
