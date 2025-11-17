// src/components/dashboard/caretakerColumns.ts

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Eye, MoreHorizontal, Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useCaretakerStore } from "@/store/useCareTaker";
import { Caretaker } from "@/types/careTaker";

// ============================================================
// 👉 CLEAN + CORRECT COLUMNS
// ============================================================

export const caretakerColumns = (
  handleViewOpen: (state: boolean) => void,
  handleDeleteOpen: (state: boolean) => void
): ColumnDef<Caretaker>[] => [
  {
    accessorKey: "userId",
    header: () => <span className="pl-4">Caretaker ID</span>,
    cell: ({ row }) => <span className="pl-4">{row.original._id}</span>,
  },

  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => row.original.fullName,
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email,
  },

{
  id: "assignedPatientsList",
  accessorKey: "assignedPatients",
  header: "Assigned Patients",
  cell: ({ row }) => {
    const patients = row.original.assignedPatients || [];

    if (patients.length === 0) {
      return <Badge>No Patients</Badge>;
    }

    return (
      <div className="flex flex-wrap gap-1">
        {patients.map((p: any) => (
          <Badge
            key={p._id}
            className="bg-blue-100 text-blue-700 border border-blue-300"
          >
            {p.fullName || p._id}
          </Badge>
        ))}
      </div>
    );
  },
},


  {
    accessorKey: "assignedPatients",
    header: "Total Patients",
    cell: ({ row }) => {
      const patients = row.original.assignedPatients || [];
      return <span className="font-semibold">{patients.length}</span>;
    },
  },

  // ============================================================
  // 🎯 ACTIONS
  // ============================================================

  {
    id: "actions",
    header: () => <span className="pl-8">Actions</span>,
    cell: ({ row }) => {
      const caretaker = row.original;

      const { viewCaretaker, setSelectedCaretaker } =
        useCaretakerStore.getState();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            {/* VIEW */}
            <DropdownMenuItem
              onClick={async () => {
                const res = await viewCaretaker(caretaker._id!);
                if (res.success) {
                  handleViewOpen(true);
                }
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* DELETE */}
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                setSelectedCaretaker(caretaker);
                handleDeleteOpen(true);
              }}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
