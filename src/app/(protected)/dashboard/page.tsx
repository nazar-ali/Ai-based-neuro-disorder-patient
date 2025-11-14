"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/DataTable"
import { alertColumns } from "@/components/dashboard/columns"
import AddPatientDialog from "@/components/dialogs/AddPatientDialog"
import AddDoctorDialog from "@/components/dialogs/AddDoctorDialog"
import AddCaretakerDialog from "@/components/dialogs/Caretaker"
// import AddCaretakerDialog from "@/components/dialogs/AddCaretakerDialog"

export default function DashboardPage() {
  const [rowsPerPage, setRowsPerPage] = useState("10")
  const [openDialog, setOpenDialog] = useState<"patient" | "doctor" | "caretaker" | null>(null)

  const alerts = [
    {
      id: "PT12345",
      type: "Abnormal MRI Scan Detected",
      severity: (
        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          High
        </span>
      ),
      timestamp: "2024-01-15 10:30 AM",
    },
    {
      id: "PT67890",
      type: "Increased Cognitive Decline",
      severity: (
        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Medium
        </span>
      ),
      timestamp: "2024-01-14 03:45 PM",
    },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col mb-10 md:flex-row md:items-center md:justify-between mb-6 gap-4"  >

     
      <div className="">
        <h1 className="text-2xl font-extrabold mb-2 text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Manage doctors, patients, and caretakers. Add new records directly from here.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end flex-wrap gap-4 ">
        <Button
          onClick={() => setOpenDialog("doctor")}
          className="bg-teal-600 cursor-pointer hover:bg-teal-700 text-white font-medium shadow-sm transition-all"
        >
          + Add Doctor
        </Button>

        <Button
          onClick={() => setOpenDialog("patient")}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
        >
          + Add Patient
        </Button>

        <Button
          onClick={() => setOpenDialog("caretaker")}
          className="bg-rose-600 cursor-pointer hover:bg-rose-700 text-white font-medium shadow-sm transition-all"
        >
          + Add Caretaker
        </Button>
      </div>
 </div>
      {/* Data Table */}
      <div className="grid grid-cols-1 gap-8">
        <DataTable
          title="Recent Alerts"
          columns={alertColumns}
          data={alerts}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={() => setRowsPerPage}
        />
      </div>

      {/* Dialogs */}
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
