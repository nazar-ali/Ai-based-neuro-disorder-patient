// src/components/dashboard/patientColumns.ts
import { PatientRow } from "@/types/patientFormtypes";
import { ColumnDef } from "@tanstack/react-table";

export const patientColumns: ColumnDef<PatientRow>[] = [
  {
    accessorKey: "mriRecordId",
    header: "MRI-RecordId",
    cell: (info) => info.getValue() ?? "-",
  },
  {
    accessorKey: "fullName",
    header: "Patient Name",
    cell: (info) => info.getValue() ?? "-",
  },
  {
    accessorKey: "assignedDoctor",
    header: "Assigned Doctor",
    cell: (info) => {
      const v = info.getValue() as PatientRow["assignedDoctor"];
      return v && typeof v === "object"
        ? v.fullName ?? v.email ?? "-"
        : typeof v === "string"
        ? v
        : "-";
    },
  },
  {
    accessorKey: "assignedCaretaker",
    header: "Assigned Caretaker",
    cell: (info) => {
      const v = info.getValue() as PatientRow["assignedCaretaker"];
      return v && typeof v === "object"
        ? v.fullName ?? v.email ?? "-"
        : typeof v === "string"
        ? v
        : "-";
    },
  },
];
