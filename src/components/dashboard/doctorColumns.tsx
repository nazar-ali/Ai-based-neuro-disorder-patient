"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Doctor } from "@/store/useDoctorStore";

export const doctorColumns: ColumnDef<Doctor, any>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => {
      // If userId is a string → show it
      // If it's an object → fallback to doctor's own _id
      const uid =
        typeof row.original.userId

      return (
        <span className="text-xs text-muted-foreground truncate block max-w-[150px]">
          {uid}
        </span>
      );
    },
  },

  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900">
        {row.original.fullName || "—"}
      </span>
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.email || "—"}
      </span>
    ),
  },

  {
    accessorKey: "specialization",
    header: "Specialization",
    cell: ({ row }) =>
      row.original.specialization ? (
        <Badge variant="outline" className="px-2 py-1 rounded-md">
          {row.original.specialization}
        </Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },

  {
    accessorKey: "experienceYears",
    header: "Experience",
    cell: ({ row }) => (
      <span>
        {row.original.experience
          ? `${row.original.experience} yrs`
          : "0 yrs"}
      </span>
    ),
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => console.log("edit", row.original.userId)}
        >
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => console.log("delete", row.original.userId)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];
