"use client";

import { DataTable } from "./DataTable";
import { pendingColumns } from "./admin/pendingColumns";
import { useUserApprovalStore } from "@/store/userApproval";
import { useEffect, useState } from "react";
import RejectReasonDialog from "./dialogs/rejectDialog";
import ConfirmDeleteDialog from "./dialogs/ConfirmDeleteDialog"; // your new dialog

export default function PendingUsers() {
  const { pendingUsers, fetchPendingUsers, approveUser, deleteUser } =
    useUserApprovalStore();

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // open delete dialog
  const handleDeleteOpen = (id: string) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleRejectClick = (userId: string) => {
    setSelectedUserId(userId);
    setRejectDialogOpen(true);
  };

  const handleRejectSubmit = (reason: string) => {
    if (!selectedUserId) return;
    approveUser(selectedUserId, "rejected", reason);
  };

  return (
    <>
      <DataTable
        columns={pendingColumns(handleRejectClick, handleDeleteOpen)}
        data={pendingUsers}
      />

      {/* Reject Dialog */}
      <RejectReasonDialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onSubmit={handleRejectSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onCancel={() => setOpenDeleteDialog(false)}
        onConfirm={async () => {
          if (!deleteId) return;
          await deleteUser(deleteId);
          await fetchPendingUsers(); // refresh table
          setOpenDeleteDialog(false);
          setDeleteId(null);
        }}
      />
    </>
  );
}
