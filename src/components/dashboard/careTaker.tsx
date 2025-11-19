"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Eye, Trash, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";

import { useCaretakerStore } from "@/store/useCareTaker";
import { Caretaker } from "@/types/careTaker";

export const caretakerColumns = (
  handleViewOpen: (state: boolean) => void,
  handleDeleteOpen: (state: boolean) => void
): ColumnDef<Caretaker>[] => [
  {
    accessorKey: "userId",
    header: () => <div className="text-center">Caretaker ID</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original._id}</div>
    ),
  },

  {
    accessorKey: "fullName",
    header: () => <div className="text-center">Full Name</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.fullName}</div>
    ),
  },

  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.email}</div>
    ),
  },

  {
    id: "assignedPatientsList",
    accessorKey: "assignedPatients",
    header: () => <div className="text-center">Assigned Patients</div>,
    cell: ({ row }) => {
      const patients = row.original.assignedPatients || [];

      if (patients.length === 0) {
        return (
          <div className="text-center">
            <Badge>No Patients</Badge>
          </div>
        );
      }

      return (
        <div className="flex justify-center flex-wrap gap-1">
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
    header: () => <div className="text-center">Total Patients</div>,
    cell: ({ row }) => (
      <div className="text-center font-semibold">
        {row.original.assignedPatients?.length || 0}
      </div>
    ),
  },

  // ============================================================
  // 🎯 UPDATED ACTIONS (NO DROPDOWN → DIRECT BUTTONS)
  // ============================================================

  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const caretaker = row.original;
      const { viewCaretaker, setSelectedCaretaker } =
        useCaretakerStore.getState();

      return (
        <div className="flex justify-center items-center gap-3">

          {/* VIEW BUTTON */}
          <Button
            size="sm"
            variant="outline"
           className="h-8 w-8 rounded-full text-white cursor-pointer p-0 bg-yellow-500 hover:bg-yellow-600"
            onClick={async () => {
              const res = await viewCaretaker(caretaker._id!);
              if (res.success) handleViewOpen(true);
            }}
          >
            <Eye className="h-4 w-4 " />
           
          </Button>

          {/* DELETE BUTTON */}
          <Button
            size="sm"
            variant="destructive"
            className="h-8 w-8 rounded-full p-0 bg-rose-600 cursor-pointer hover:bg-rose-700"
            onClick={() => {
              setSelectedCaretaker(caretaker);
              handleDeleteOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4 " />
          
          </Button>

        </div>
      );
    },
  },
];
