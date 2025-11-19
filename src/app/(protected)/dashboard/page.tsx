"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { doctorColumns } from "@/components/dashboard/doctorColumns";
import { getPatientColumns } from "@/components/dashboard/patientColumns";
import { caretakerColumns } from "@/components/dashboard/careTaker";

import { useDoctorStore } from "@/store/useDoctorStore";
import { usePatientStore } from "@/store/usePatients";
import { useCaretakerStore } from "@/store/useCareTaker";

import { useLoggedInUser } from "@/hooks/userLoggedIn";

import AddPatientDialog from "@/components/dialogs/AddPatientDialog";
import AddDoctorDialog from "@/components/dialogs/AddDoctorDialog";
import AddCaretakerDialog from "@/components/dialogs/Caretaker";
import ViewCaretakerModal from "@/components/dialogs/veiwCaretakerDialog";
import DeleteCaretakerModal from "@/components/dialogs/deleteCareTakerDialog";
import ConfirmDeleteDialog from "@/components/dialogs/ConfirmDeleteDialog";
import { toast } from "sonner";
import ViewPatientModal from "@/components/dialogs/viewPatientDialog";
import { Doctor } from "@/types/doctor";

export default function DashboardPage() {
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
const [viewDoctor, setViewDoctor] = useState<Doctor | null>(null);

const [openView, setOpenView] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const selectedCaretaker = useCaretakerStore((s) => s.selectedCaretaker);

  const [openDialog, setOpenDialog] = useState<
    "patient" | "doctor" | "caretaker" | null
  >(null);

  const [adminTable, setAdminTable] = useState<
    "doctors" | "patients" | "caretakers"
  >("doctors");

  const { loggedInUser } = useLoggedInUser();
  const role = loggedInUser?.role;
  const userId = loggedInUser?._id;

  const doctors = useDoctorStore((s) => s.doctors);
  const { getAllDoctors, loading } = useDoctorStore();

  const { patients, patientLoading } = usePatientStore();
  const { fetchPatients,deletePatient } = usePatientStore();

  const { caretakers, caretakerLoading } = useCaretakerStore();
  const fetchCaretakers = useCaretakerStore((s) => s.getAllCaretakers);

  // FETCH DATA
  useEffect(() => {
    if (!role) return;

    switch (role) {
      case "admin":
        getAllDoctors();
        fetchPatients();
        fetchCaretakers();
        break;

      case "doctor":
      case "caretaker":
      case "patient":
        fetchPatients();
        break;
    }
  }, [role]);

  // FILTER FOR NON-ADMIN USERS
  let displayedPatients = patients;

  if (role === "doctor") {
    displayedPatients = patients.filter((p) =>
      typeof p.assignedDoctor === "string"
        ? p.assignedDoctor === userId
        : p.assignedDoctor?._id === userId
    );
  }

  if (role === "caretaker") {
    displayedPatients = patients.filter((p) =>
      typeof p.assignedCaretaker === "string"
        ? p.assignedCaretaker === userId
        : p.assignedCaretaker?._id === userId
    );
  }

  if (role === "patient") {
    displayedPatients = patients.filter((p) => p._id === userId);
  }

   const columns = getPatientColumns(
  (id) => handleView(id),
  (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  }
);
const handleView = (id: string) => {
  const found = patients.find((p) => p._id === id);
  setSelectedPatient(found || null);
  setOpenView(true);
};




  return (
    <div className="p-4 bg-gray-100">

      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2">
        <h1 className="text-xl font-bold text-gray-800">
          {role === "admin" && "Admin Dashboard"}
          {role === "doctor" && "Doctor Dashboard"}
          {role === "caretaker" && "Caretaker Dashboard"}
          {role === "patient" && "Patient Dashboard"}
        </h1>
       
      </div>

      {/* Admin Action Section */}
      {role === "admin" && (
        <div className="bg-white shadow-sm rounded-xl p-3 mb-2 ">

          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-3">

            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
              onClick={() => setOpenDialog("doctor")}
            >
              + Add Doctor
            </Button>

            <Button
              className="bg-blue-700 hover:bg-blue-800 text-white shadow-sm"
              onClick={() => setOpenDialog("patient")}
            >
              + Add Patient
            </Button>

            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
              onClick={() => setOpenDialog("caretaker")}
            >
              + Add Caretaker
            </Button>
          </div>
        </div>
      )}

      {/* Admin Data Sections */}
      {role === "admin" && (
        <div className="bg-white rounded-xl shadow-sm  p-3 mb-2">

          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Manage Users
          </h2>

       <Tabs
  value={adminTable}
  onValueChange={(v: any) => setAdminTable(v)}
  className="w-full"
>
  <TabsList className="bg-gray-200 rounded-lg w-1/3 p-1 gap-2">
    <TabsTrigger
      value="doctors"
      className="px-5 rounded-md data-[state=active]:bg-white data-[state=active]:text-black"
    >
      Doctors
    </TabsTrigger>

    <TabsTrigger
      value="patients"
      className="px-5 rounded-md data-[state=active]:bg-white data-[state=active]:text-black"
    >
      Patients
    </TabsTrigger>

    <TabsTrigger
      value="caretakers"
      className="px-5 rounded-md data-[state=active]:bg-white data-[state=active]:text-black"
    >
      Caretakers
    </TabsTrigger>
  </TabsList>

  <TabsContent value="doctors" className="pt-6">
    <DataTable
      title="Doctors"
      columns={doctorColumns}
      loading={loading}
      data={doctors || []}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={setRowsPerPage}
    />
  </TabsContent>

  <TabsContent value="patients" className="pt-6">
    <DataTable
      title="Patients"
      loading={patientLoading}
      columns={columns}
      data={patients}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={setRowsPerPage}
    />
  </TabsContent>

  <TabsContent value="caretakers" className="pt-6">
    <DataTable
      title="Caretakers"
      loading={caretakerLoading}
      columns={caretakerColumns(setIsViewOpen, setIsDeleteOpen)}
      data={caretakers}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={setRowsPerPage}
    />
  </TabsContent>
</Tabs>

        </div>
      )}

      {/* Non-Admin View */}
      {role !== "admin" && (
        
          <DataTable
            title="Patients"
            columns={columns}
            data={displayedPatients}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={setRowsPerPage}
          />
       
      )}

      {/* Modals */}
      {openDialog === "patient" && (
        <AddPatientDialog open onOpenChange={() => setOpenDialog(null)} />
      )}

      {openDialog === "doctor" && (
        <AddDoctorDialog open onOpenChange={() => setOpenDialog(null)} />
      )}

      {openDialog === "caretaker" && (
        <AddCaretakerDialog open onOpenChange={() => setOpenDialog(null)} />
      )}

      <ViewCaretakerModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        caretaker={selectedCaretaker}
      />
<ViewPatientModal
  isOpen={openView}
  onClose={() => setOpenView(false)}
  patient={selectedPatient}
/>
      <DeleteCaretakerModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        caretaker={selectedCaretaker}
      />

       <ConfirmDeleteDialog
        open={openDelete}
        title="Delete Patient"
        description="Are you sure you want to delete this patient? This action cannot be undone."
        onCancel={() => setOpenDelete(false)}
        onConfirm={async () => {
          if (!deleteId) return;

          await deletePatient(deleteId);
          await fetchPatients(); // refresh

          setOpenDelete(false);
          setDeleteId(null);
          toast.success("Patient deleted successfully");
        }}
      />
    </div>
  );
}
