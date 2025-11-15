// src/store/useAuthStore.ts
import { create } from "zustand";
import { UserRole } from "@/types/user";

interface AuthState {
  userId: string | null;
  role: UserRole | null;
  token: string | null;

  setAuth: (data: { userId: string; role: UserRole; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  let saved: AuthState | null = null;

  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("auth");
    if (raw) {
      try {
        saved = JSON.parse(raw);
      } catch {
        localStorage.removeItem("auth");
      }
    }
  }

  return {
    userId: saved?.userId ?? null,
    role: saved?.role ?? null,
    token: saved?.token ?? null,

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
      set({
        userId: null,
        role: null,
        token: null,
      });
    },
  };
});
