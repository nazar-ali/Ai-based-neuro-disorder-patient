"use client"
import { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable";
import { usePatientStore } from "@/store/usePatients";
import { useLoggedInUser } from "@/hooks/userLoggedIn";
import { getPatientColumns } from "@/components/dashboard/patientColumns";
import { Patient } from "@/lib/types";
import { PatientForm } from "@/types/patientFormtypes";
import { Button } from "@/components/ui/button";
import AddPatientDialog from "@/components/dialogs/AddPatientDialog";

const PatientDashboardPage = () => {
const [selectedPatient, setSelectedPatient] = useState<PatientForm | null>(null);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState("10");
const [openDialog, setOpenDialog] = useState<"patient" | null>(null);

  const { loggedInUser } = useLoggedInUser();

  const { patients, patientLoading, fetchPatients, deletePatient } = usePatientStore();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

const handleView = (id: string) => {
  const found = patients.find((p) => p._id === id);

  if (!found) {
    setSelectedPatient(null);
    return;
  }

  // Convert Patient → PatientForm
  const formData: PatientForm = {
    medicalRecordsId: found.medicalRecordsId,
    consent_dataSharing: found.consent_dataSharing,
    emergencyContacts: found.emergencyContacts,
    demographics: found.demographics,
    careTeam_doctors: found.careTeam_doctors,
    careTeam_caretakers: found.careTeam_caretakers,
    allergies: found.allergies,
    medicalHistory: found.medicalHistory,
    assignedDoctor: found?.assignedDoctor ?? null, // <-- IMPORTANT FIX
    assignedCaretaker: found.assignedCaretaker ?? null,
    fullName: found.fullName,
  };

  setSelectedPatient(formData);
  setOpenView(true);
};
  const handleDelete = async () => {
    if (!deleteId) return;
    await deletePatient(deleteId);
    setOpenDelete(false);
  };

  const columns = getPatientColumns(
    (id) => handleView(id),
    (id) => {
      setDeleteId(id);
      setOpenDelete(true);
    }
  );

  return (
     <div className="p-4 bg-gray-100">
          <div className="mb-4 flex justify-between">
        <h1 className="text-xl font-bold text-gray-800">Doctor Dashboard</h1>
          <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
              onClick={() => setOpenDialog("patient")}
            >
              + Add Patient Information
            </Button>

      </div>
      <DataTable
        title="Patients"
        loading={patientLoading}
        columns={columns}
        data={patients}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
      />

      {openDialog === "patient" && (
              <AddPatientDialog open onOpenChange={() => setOpenDialog(null)} />
            )}
    </div>

    
  );
};

export default PatientDashboardPage;