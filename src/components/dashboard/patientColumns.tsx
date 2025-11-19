"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PatientRow } from "@/types/patientFormtypes";
import { Eye, Trash2 } from "lucide-react";

export const getPatientColumns = (
  onView: (id: string) => void,
  onDelete: (id: string) => void
): ColumnDef<PatientRow>[] => {
  return [
 {
  accessorKey: "medicalRecordsId",
  header: () => <div className="text-center">Medical Record ID</div>,
  cell: ({ row }) => (
    <div className="text-center">{row.original.medicalRecordsId || "—"}</div>
  ),
},


  {
    accessorKey: "fullName",
    header: () => <div className="text-center">Patient Name</div>,
    cell: ({ row }) => (
      <div className="text-center font-semibold text-gray-900">
        {row.original.fullName || "—"}
      </div>
    ),
  },

  {
    accessorKey: "assignedDoctor",
    header: () => <div className="text-center">Assigned Doctor</div>,
    cell: ({ row }) => {
      const doc = row.original.assignedDoctor;
      const id =
        typeof doc === "string"
          ? doc
          : doc && typeof doc === "object"
          ? doc._id
          : "—";

      return (
        <div className="text-center text-sm text-muted-foreground">
          {id}
        </div>
      );
    },
  },

  {
    accessorKey: "assignedCaretaker",
    header: () => <div className="text-center">Assigned Caretaker</div>,
    cell: ({ row }) => {
      const ct = row.original.assignedCaretaker;
      const id =
        typeof ct === "string"
          ? ct
          : ct && typeof ct === "object"
          ? ct._id
          : "—";

      return (
        <div className="text-center text-sm text-muted-foreground">
          {id}
        </div>
      );
    },
  },

  {
    accessorKey: "allergies",
    header: () => <div className="text-center">Allergies</div>,
    cell: ({ row }) => {
      const allergies = row.original.allergies;
      const text = Array.isArray(allergies)
        ? allergies.join(", ")
        : allergies || "—";

      return (
        <div className="text-center text-sm text-muted-foreground">
          {text}
        </div>
      );
    },
  },

  // ⭐ NEW COLUMN — EMERGENCY CONTACTS
  {
    accessorKey: "emergencyContacts",
    header: () => <div className="text-center">Emergency Contacts</div>,
    cell: ({ row }) => {
     const contacts = row.original.emergencyContacts;
return (
 <div className="text-center text-sm text-muted-foreground truncate max-w-[160px]">
    {contacts && contacts.length > 0
      ? contacts.map((c) => c.contact).join(", ")
      : "-"}
  </div>
);

     
    },
  },

  // ==========================
  // ACTION BUTTONS
  // ==========================
 {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const patientId = row.original._id;

        return (
          <div className="flex justify-center items-center gap-2">

            {/* VIEW BUTTON */}
            <Button
              size="icon"
              className="h-8 w-8 rounded-full bg-yellow-500 hover:bg-yellow-600"
              onClick={() => onView(patientId)}
            >
              <Eye className="h-4 w-4 text-white" />
            </Button>

            {/* DELETE BUTTON */}
            <Button
              size="icon"
              className="h-8 w-8 rounded-full bg-rose-500 hover:bg-rose-600"
              onClick={() => onDelete(patientId)}
            >
              <Trash2 className="h-4 w-4 text-white" />
            </Button>

          </div>
        );
      },
    },
]
};