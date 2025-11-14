import { create } from "zustand";
import { RegisterUserPayload } from "@/types/user";

interface SignedInUserState {
  loggedInUser: RegisterUserPayload | null;
  setLoggedInUser: (user: RegisterUserPayload) => void;
  resetLoggedInUser: () => void;
}

export const useSignedInUser = create<SignedInUserState>((set) => {
  let savedUser: RegisterUserPayload | null = null;

  // ✅ Read user only once when window is available
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("loggedInUser");
    if (stored) {
      try {
        savedUser = JSON.parse(stored);
      } catch {
        localStorage.removeItem("loggedInUser");
      }
    }
  }

  return {
    loggedInUser: savedUser,

    // ✅ Set user and save to localStorage
    setLoggedInUser: (user) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
      }
      set({ loggedInUser: user });
    },

    // ✅ Reset user safely without infinite re-renders
    resetLoggedInUser: () => {
      set((state) => {
        if (state.loggedInUser === null) return state; // Prevent redundant update
        if (typeof window !== "undefined") {
          localStorage.removeItem("loggedInUser");
        }
        return { loggedInUser: null };
      });
    },
  };
});
