import { create } from "zustand";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profileImageUrl?: string;
  success?: boolean;
}

interface AuthState {
  user: User | null;
  success?: boolean;
  accessToken: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  success: false,

  setUser: (user, token) =>
    set({
      user,
      success: true,
      accessToken: token,
    }),

  logout: () =>
    set({
      user: null,
      success: false,
      accessToken: null,
    }),
}));
