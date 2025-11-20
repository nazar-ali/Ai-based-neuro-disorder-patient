"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/types/doctor";
import { Trash2, Edit } from "lucide-react";

export const doctorColumns = (
  onView: (id: string) => void,
  onDelete: (id: string) => void
): ColumnDef<Doctor, any>[] => [
  {
    accessorKey: "_id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ row }) => (
      <div className="text-center text-xs text-muted-foreground truncate max-w-[150px]">
        {row.original.userId}
      </div>
    ),
  },

  {
    accessorKey: "fullName",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <div className="text-center font-semibold text-gray-900">
        {row.original.fullName || "—"}
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="text-center text-sm text-muted-foreground">
        {row.original.email || "—"}
      </div>
    ),
  },

  {
    accessorKey: "specialization",
    header: () => <div className="text-center">Specialization</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.specialization}</div>
    ),
  },

  {
    accessorKey: "experience",
    header: () => <div className="text-center">Experience</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.experience ? `${row.original.experience} yrs` : "0 yrs"}
      </div>
    ),
  },

  {
    accessorKey: "assignedPatients",
    header: "Assigned Patients",
    cell: ({ row }) => {
      const patients = row.original.assignedPatients;

      if (!patients || patients.length === 0) {
        return (
          <span className="text-sm text-muted-foreground">No Patients</span>
        );
      }

      return (
        <span className="text-sm text-muted-foreground">
          {patients.map((p: any) => p.fullName).join(", ")}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const id = row.original.userId;
      return (
        <div className="flex justify-center items-center gap-2">
          {/* ⭐ VIEW BUTTON */}
          <Button
            size="icon"
            variant="secondary"
            onClick={() => onView(id)}
            className="h-8 w-8 rounded-full p-0 bg-yellow-400 cursor-pointer hover:bg-yellow-500"
          >
            <Edit className="h-4 w-4" />
          </Button>

          {/* ❌ DELETE BUTTON */}
          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete(id)}
            className="h-8 w-8 rounded-full p-0 bg-rose-500 cursor-pointer hover:bg-rose-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
