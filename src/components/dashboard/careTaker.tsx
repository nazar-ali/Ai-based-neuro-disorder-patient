// src/components/dashboard/caretakerColumns.ts
import { ColumnDef } from "@tanstack/react-table";

export const caretakerColumns: ColumnDef<any>[] = [
  {
    accessorKey: "fullName",
    header: "Caretaker Name",
    cell: (info) => info.getValue() ?? "-",
  },
  {
    accessorKey: "assignedPatients",
    header: "Assigned Patient(s)",
    cell: (info) => {
      const list = info.getValue() as any[] | undefined;
      if (!list || list.length === 0) return "-";
      return list.map((p) => (typeof p === "object" ? p.fullName ?? p._id : p)).join(", ");
    },
  },
  {
    accessorKey: "patientSummary",
    header: "Patient Summary",
    cell: (info) => info.getValue() ?? "-",
  },
];
