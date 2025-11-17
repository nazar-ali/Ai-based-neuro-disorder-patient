"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { doctorColumns } from "@/components/dashboard/doctorColumns";
import { patientColumns } from "@/components/dashboard/patientColumns";
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

export default function DashboardPage() {
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
  const fetchDoctors = useDoctorStore((s) => s.getAllDoctors);

  const patients = usePatientStore((s) => s.patients);
  const fetchPatients = usePatientStore((s) => s.fetchPatients);

  const caretakers = useCaretakerStore((s) => s.caretakers);
  const fetchCaretakers = useCaretakerStore((s) => s.getAllCaretakers);
console.log("fetchCaretakers:", caretakers);
  // ----------------------------------------
  // FETCH DATA BASED ON ROLE
  // ----------------------------------------
  useEffect(() => {
    if (!role) return;

    switch (role) {
      case "admin":
        fetchDoctors();
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

  // ----------------------------------------
  // FILTER PATIENT VIEW FOR NON-ADMIN USERS
  // ----------------------------------------
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

  // ----------------------------------------
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            {role === "admin" && "Admin Dashboard"}
            {role === "doctor" && "Doctor Dashboard"}
            {role === "caretaker" && "Caretaker Dashboard"}
            {role === "patient" && "Patient Dashboard"}
          </h1>
          <p className="text-sm text-gray-500">
            Your role determines what data you can access.
          </p>
        </div>

        {/* ADMIN ACTION BUTTONS */}
        {role === "admin" && (
          <div className="flex gap-3">
            <Button
              className="bg-teal-600"
              onClick={() => setOpenDialog("doctor")}
            >
              + Add Doctor
            </Button>

            <Button
              className="bg-blue-600"
              onClick={() => setOpenDialog("patient")}
            >
              + Add Patient
            </Button>

            <Button
              className="bg-rose-600"
              onClick={() => setOpenDialog("caretaker")}
            >
              + Add Caretaker
            </Button>
          </div>
        )}
      </div>

      {/* ADMIN TABS */}
      {role === "admin" && (
        <Tabs
          value={adminTable}
          onValueChange={(v: any) => setAdminTable(v)}
          className="mb-10"
        >
          <TabsList className="w-fit bg-gray-100 rounded-lg p-1 shadow-sm">
            <TabsTrigger value="doctors" className="px-5">
              Doctors
            </TabsTrigger>
            <TabsTrigger value="patients" className="px-5">
              Patients
            </TabsTrigger>
            <TabsTrigger value="caretakers" className="px-5">
              Caretakers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="doctors">
            <DataTable
              title="Doctors"
              columns={doctorColumns}
              data={doctors}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          </TabsContent>

          <TabsContent value="patients">
            <DataTable
              title="Patients"
              columns={patientColumns}
              data={patients}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          </TabsContent>

          <TabsContent value="caretakers">
            <DataTable
              title="Caretakers"
                columns={caretakerColumns(setIsViewOpen, setIsDeleteOpen)}
              data={caretakers}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          </TabsContent>
        </Tabs>
      )}

      {/* NON-ADMIN USERS */}
      {role !== "admin" && (
        <DataTable
          title="Patients"
          columns={patientColumns}
          data={displayedPatients}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      )}

      {/* DIALOGS */}
      {openDialog === "patient" && (
        <AddPatientDialog open onOpenChange={() => setOpenDialog(null)} />
      )}

      {openDialog === "doctor" && (
        <AddDoctorDialog open onOpenChange={() => setOpenDialog(null)} />
      )}

      {openDialog === "caretaker" && (
        <AddCaretakerDialog open onOpenChange={() => setOpenDialog(null)} />
      )}

      {/* VIEW CARETAKER MODAL */}
      <ViewCaretakerModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        caretaker={selectedCaretaker}
      />

      {/* DELETE CARETAKER MODAL */}
      <DeleteCaretakerModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        caretaker={selectedCaretaker}
      />
    </div>
  );
}
