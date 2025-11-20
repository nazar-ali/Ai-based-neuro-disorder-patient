"use client";

import api from "@/lib/axiosClient";
import { create } from "zustand";

export interface AppUser {
  id: string;
  _id: string;
  fullName: string;
  email: string;
  role: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface UserApprovalState {
  pendingUsers: AppUser[];
  approvedUsers: AppUser[];
  rejectUsers: AppUser[];
pendingUsersLoading:boolean;
  loading: boolean;
  error: string | null;

  fetchPendingUsers: () => Promise<void>;
  fetchApprovedUsers: () => Promise<void>;
  fetchRejectedUsers: () => Promise<void>;

  approveUser: (
  id: string,
  role: "doctor" | "patient" | "caretaker" | "admin" | "rejected",
  reason?: string
) => Promise<any>;
  deleteUser: (id: string) => Promise<any>;   // ✅ NEW TYPE

}

// Helper to clean user data
const mapUsers = (users: any[]) =>
  users.map((u) => ({
    ...u,
    id: u._id,
  }));

export const useUserApprovalStore = create<UserApprovalState>((set, get) => ({
  pendingUsers: [],
  approvedUsers: [],
  rejectUsers: [],
  loading: false,
  pendingUsersLoading:false,
  error: null,

  // -------------------------------------------------
  // FETCH PENDING USERS
  // -------------------------------------------------
  fetchPendingUsers: async () => {
    try {
      set({ pendingUsersLoading: true, error: null });

      const res = await fetch("/api/admin/pending-users");
      const data = await res.json();

      if (!data.success) {
        return set({ error: data.error, pendingUsersLoading: false });
      }

      set({
        pendingUsers: mapUsers(data.users),
        pendingUsersLoading: false,
      });
    } catch (err: any) {
      set({ error: err.message, pendingUsersLoading: false });
    }
  },

  // -------------------------------------------------
  // FETCH APPROVED USERS
  // -------------------------------------------------
  fetchApprovedUsers: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("/api/admin/approve-users");
      const data = await res.json();
      console.log("fetch approved user",data)
      if (!data.success) {
        return set({ error: data.error, loading: false });
      }

      set({
        approvedUsers: mapUsers(data.users),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // -------------------------------------------------
  // FETCH REJECTED USERS
  // -------------------------------------------------
  fetchRejectedUsers: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("/api/admin/reject-users");
      const data = await res.json();

      if (!data.success) {
        return set({ error: data.error, loading: false });
      }

      set({
        rejectUsers: mapUsers(data.users),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // -------------------------------------------------
  // APPROVE / REJECT USER
  // -------------------------------------------------
 approveUser: async (id: string, role: string, reason?: string) => {
  try {
    set({ loading: true, error: null });

    let endpoint = "";
    let payload: any = {};

    if (role === "rejected") {
      endpoint = `/admin/reject-users/${id}`;
      payload = { reason };  // send reason
    } else {
      endpoint = `/admin/approve-users/${id}`;
      payload = { role };
    }

    const res = await api.patch(endpoint, payload);
    const data = res.data;

    if (!data.success) {
      return set({ error: data.error, loading: false });
    }

    await Promise.all([
      get().fetchPendingUsers(),
      get().fetchApprovedUsers(),
      get().fetchRejectedUsers(),
    ]);

    return data;
  } catch (err: any) {
    set({ error: err.message });
  } finally {
    set({ loading: false });
  }
},

deleteUser: async (id: string) => {
  try {
    set({ loading: true, error: null });

    const res = await api.delete(`/admin/users/${id}`);
    const data = res.data;

    if (!data.success) {
      return set({ error: data.error, loading: false });
    }

    // Refetch all lists — keeps UI updated everywhere
    await Promise.all([
      get().fetchPendingUsers(),
      get().fetchApprovedUsers(),
      get().fetchRejectedUsers(),
    ]);

    return data;
  } catch (err: any) {
    set({ error: err.message });
  } finally {
    set({ loading: false });
  }
},
}));
