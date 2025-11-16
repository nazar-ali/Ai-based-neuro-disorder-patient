"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Doctor } from "@/store/useDoctorStore";
import { MoreHorizontal } from "lucide-react";

export const doctorColumns: ColumnDef<Doctor, any>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground truncate block max-w-[120px]">
        {row.original.userId ?? row.original._id}
      </span>
    ),
  },

  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900">{row.original.fullName}</span>
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.email}</span>
    ),
  },

  {
    accessorKey: "specialization",
    header: "Specialization",
    cell: ({ row }) => (
      row.original.specialization ? (
        <Badge variant="outline" className="px-2 py-1 rounded-md">
          {row.original.specialization}
        </Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      )
    ),
  },

  {
    accessorKey: "experienceYears",
    header: "Experience",
    cell: ({ row }) => (
      <span>
        {row.original.experienceYears
          ? `${row.original.experienceYears} yrs`
          : "0 yrs"}
      </span>
    ),
  },

  // --------------------------------------------------------
  // ⭐ Professional Action Buttons
  // --------------------------------------------------------
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">

        {/* Edit Button */}
        <Button
          size="sm"
          variant="secondary"
          className="rounded-lg px-3"
          onClick={() => console.log("edit", row.original._id)}
        >
          Edit
        </Button>

        {/* Delete Button */}
        <Button
          size="sm"
          variant="destructive"
          className="rounded-lg px-3"
          onClick={() => console.log("delete", row.original._id)}
        >
          Delete
        </Button>

        {/* More Menu (optional professional touch) */}
        {/* <Button size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button> */}
      </div>
    ),
  },
];
