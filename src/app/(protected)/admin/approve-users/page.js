"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";

import { useUserApprovalStore } from "@/store/userApproval";

export default function ApproveUsersPage() {
  const {
    pendingUsers,
    loading,
    fetchPendingUsers,
    approveUser,
  } = useUserApprovalStore();

  useEffect(() => {
    fetchPendingUsers();
  }, [fetchPendingUsers]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Pending User Approvals</h1>

      <div className="border rounded-xl shadow-sm bg-white">
        <Table>
          <TableHeader className="bg-gray-100 border-b">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : pendingUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No pending users.
                </TableCell>
              </TableRow>
            ) : (
              pendingUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.role}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="bg-blue-600 text-white"
                        onClick={() => approveUser(user.id, "doctor")}
                      >
                        Doctor
                      </Button>

                      <Button
                        size="sm"
                        className="bg-green-600 text-white"
                        onClick={() => approveUser(user.id, "patient")}
                      >
                        Patient
                      </Button>

                      <Button
                        size="sm"
                        className="bg-purple-600 text-white"
                        onClick={() => approveUser(user.id, "caretaker")}
                      >
                        Caretaker
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
