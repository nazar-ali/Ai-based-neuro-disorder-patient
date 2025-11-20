"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";

import { doctorColumns } from "@/components/dashboard/doctorColumns";
import { useDoctorStore } from "@/store/useDoctorStore";

import ViewDoctorDialog from "@/components/dialogs/viewDoctorDialog";
import ConfirmDeleteDialog from "@/components/dialogs/ConfirmDeleteDialog";

import { Doctor } from "@/types/doctor";
import { toast } from "sonner";
import AddDoctorDialog from "@/components/dialogs/AddDoctorDialog";

export default function DoctorDashboardPage() {
  const [rowsPerPage, setRowsPerPage] = useState("10");

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
const [openDialog, setOpenDialog] = useState<"doctor" | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { doctors, loading, getAllDoctors, deleteDoctor } = useDoctorStore();

  // Fetch doctors on mount
  useEffect(() => {
    getAllDoctors();
  }, []);

  // 🔍 Handle View Doctor
  const handleView = (id: string) => {
    const doctor = doctors.find((d) => d?.userId === id);
    setSelectedDoctor(doctor || null);
    setOpenViewDialog(true);
  };

  // ❌ Handle Delete Doctor
  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  // Inject handlers into doctor columns
  const columns = doctorColumns(handleView, handleDelete);

  return (
    <div className="p-4 bg-gray-100">
      <div className="mb-4 flex justify-between">
        <h1 className="text-xl font-bold text-gray-800">Doctor Dashboard</h1>
          <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
              onClick={() => setOpenDialog("doctor")}
            >
              + Add  Information
            </Button>

      </div>

      

      <div className="bg-white shadow-sm rounded-xl p-4">
        <DataTable
          title="Doctors"
          columns={columns}
          loading={loading}
          data={doctors || []}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>

      {/* 👉 View Doctor Dialog */}
      <ViewDoctorDialog
        open={openViewDialog}
        onOpenChange={() => setOpenViewDialog(false)}
        doctor={selectedDoctor}
      />

      {/* ❌ Confirm Delete Doctor */}
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        title="Delete Doctor"
        description="Are you sure you want to delete this doctor? This action cannot be undone."
        onCancel={() => setOpenDeleteDialog(false)}
        onConfirm={async () => {
          if (!deleteId) return;

          await deleteDoctor(deleteId);
          await getAllDoctors();

          toast.success("Doctor deleted successfully");

          setOpenDeleteDialog(false);
          setDeleteId(null);
        }}
      />

      {openDialog === "doctor" && (
        <AddDoctorDialog open onOpenChange={() => setOpenDialog(null)} />
      )}
    </div>
  );
}
