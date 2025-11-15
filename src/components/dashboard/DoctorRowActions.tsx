"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ConfirmDeleteDialog from "@/components/dialogs/ConfirmDeleteDialog";
import { useDoctorStore, Doctor } from "@/store/useDoctorStore";

interface Props {
  doctor: Doctor;
}

export default function DoctorRowActions({ doctor }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteDoctor = useDoctorStore((s) => s.deleteDoctor);

  const handleDeleteClick = () => setShowDeleteDialog(true);

  const handleConfirmDelete = async () => {
    const success = await deleteDoctor(doctor._id);
    if (success) {
      setShowDeleteDialog(false);
      console.log("✅ Doctor deleted successfully");
    } else {
      console.error("❌ Failed to delete doctor");
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" onClick={() => console.log("edit", doctor._id)}>
          Edit
        </Button>
        <Button size="sm" className="bg-red-500 hover:bg-red-600" variant="outline" onClick={handleDeleteClick}>
          Delete
        </Button>
      </div>

      <ConfirmDeleteDialog
        open={showDeleteDialog}
        title="Delete Doctor"
        description={`Are you sure you want to delete ${doctor.fullName}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
