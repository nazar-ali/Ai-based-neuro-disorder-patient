"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/DataTable"

import { doctorColumns } from "@/components/dashboard/doctorColumns"
import { patientColumns } from "@/components/dashboard/patientColumns"
import { caretakerColumns } from "@/components/dashboard/careTaker"

import { useDoctorStore } from "@/store/useDoctorStore"
import { usePatientStore } from "@/store/usePatients"
import { useCaretakerStore } from "@/store/useCareTaker"
import { useAuthStore } from "@/store/useAuthStore"

import AddPatientDialog from "@/components/dialogs/AddPatientDialog"
import AddDoctorDialog from "@/components/dialogs/AddDoctorDialog"
import AddCaretakerDialog from "@/components/dialogs/Caretaker"

export default function DashboardPage() {
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [openDialog, setOpenDialog] = useState<"patient" | "doctor" | "caretaker" | null>(null)

  // 🟢 FIX HERE → Auth store has userId, NOT user
  const role = useAuthStore((s) => s.role)
  const userId = useAuthStore((s) => s.userId)
console.log("DashboardPage - role:", role, "userId:", userId)
  const doctors = useDoctorStore((s) => s.doctors)
  const fetchDoctors = useDoctorStore((s) => s.fetchDoctors)

  const patients = usePatientStore((s) => s.patients)
  const fetchPatients = usePatientStore((s) => s.fetchPatients)

  const caretakers = useCaretakerStore((s) => s.caretakers)
  const fetchCaretakers = useCaretakerStore((s) => s.fetchCaretakers)

  // ---------------------------
  // 🔥 ROLE-BASED DATA FETCHING
  // ---------------------------
  useEffect(() => {
    if (!role) return

    if (role === "admin") {
      fetchDoctors()
      fetchPatients()
      fetchCaretakers()
    }

    if (role === "doctor") {
      fetchPatients()
    }

    if (role === "caretaker") {
      fetchPatients()
    }

    if (role === "patient") {
      fetchPatients()
    }
  }, [role])

  // --------------------------
  // 🎯 FILTER DATA BY ROLE
  // --------------------------

  let displayedPatients = patients

  if (role === "doctor") {
    displayedPatients = patients.filter((p) => {
      const doc = p.assignedDoctor
      if (!doc) return false
      if (typeof doc === "string") return doc === userId
      return doc?._id === userId
    })
  }

  if (role === "caretaker") {
    displayedPatients = patients.filter((p) => {
      const c = p.assignedCaretaker
      if (!c) return false
      if (typeof c === "string") return c === userId
      return c?._id === userId
    })
  }

  if (role === "patient") {
    displayedPatients = patients.filter((p) => p._id === userId)
  }

  return (
    <div className="p-6">

      {/* ---------------- HEADER ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">
            {role === "admin" && "Admin Dashboard"}
            {role === "doctor" && "Doctor Dashboard"}
            {role === "caretaker" && "Caretaker Dashboard"}
            {role === "patient" && "Patient Dashboard"}
          </h1>
          <p className="text-sm text-gray-500">
            Role-based access control — Showing only your assigned data.
          </p>
        </div>

        {role === "admin" && (
          <div className="flex gap-3">
            <Button className="bg-teal-600 text-white"
              onClick={() => setOpenDialog("doctor")}
            >
              + Add Doctor
            </Button>
            <Button className="bg-blue-600 text-white"
              onClick={() => setOpenDialog("patient")}
            >
              + Add Patient
            </Button>
            <Button className="bg-rose-600 text-white"
              onClick={() => setOpenDialog("caretaker")}
            >
              + Add Caretaker
            </Button>
          </div>
        )}
      </div>

      {/* ---------------- TABLES ---------------- */}

      {/* ADMIN SHOWS ALL DOCTORS */}
      {role === "admin" && (
        <div className="mb-8">
          <DataTable
            title="Doctors"
            columns={doctorColumns}
            data={doctors}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(v) => setRowsPerPage(v)}
          />
        </div>
      )}

      {/* PATIENT TABLE FOR ALL ROLES */}
      <div className="mb-8">
        <DataTable
          title="Patients"
          columns={patientColumns}
          data={displayedPatients}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(v) => setRowsPerPage(v)}
        />
      </div>

      {/* ADMIN ONLY — CARETAKERS */}
      {role === "admin" && (
        <div className="mb-8">
          <DataTable
            title="Caretakers"
            columns={caretakerColumns}
            data={caretakers}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(v) => setRowsPerPage(v)}
          />
        </div>
      )}

      {/* ---------------- DIALOGS ---------------- */}
      
      {openDialog === "patient" && (
        <AddPatientDialog open={true} onOpenChange={() => setOpenDialog(null)} />
      )}
      {openDialog === "doctor" && (
        <AddDoctorDialog open={true} onOpenChange={() => setOpenDialog(null)} />
      )}
      {openDialog === "caretaker" && (
        <AddCaretakerDialog open={true} onOpenChange={() => setOpenDialog(null)} />
      )}
    </div>
  )
}
