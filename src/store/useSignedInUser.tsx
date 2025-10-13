import { create } from "zustand";
import { RegisterUserPayload } from "@/types/user";

interface SignedInUserState {
  loggedInUser: RegisterUserPayload | null;
  setLoggedInUser: (user: RegisterUserPayload) => void;
  resetLoggedInUser: () => void;
}

export const useSignedInUser = create<SignedInUserState>((set) => ({
  loggedInUser: null,

  setLoggedInUser: (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
    set({ loggedInUser: user });
  },

  resetLoggedInUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("loggedInUser");
    }
    set({ loggedInUser: null });
  },
}));
