"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserApprovalStore } from "@/store/userApproval";
import { Check, Trash2, X } from "lucide-react";
import { useDateTime } from "@/hooks/useDateTime";

export type UserRow = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
  updatedAt?: string;
};

export const pendingColumns = (
  onRejectClick: (id: string) => void,
  handleDeleteOpen: (id: string) => void
): ColumnDef<UserRow>[] => [
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
    accessorKey: "role",
    header: () => <div className="text-center">Role</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge className="bg-blue-100 text-blue-700">
          {row.original.role}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Created At</div>,
    cell: ({ row }) => {
      const { formatDate } = useDateTime();
      return (
        <div className="text-center">
          {formatDate(row.original.createdAt ?? "")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: () => (
      <div className="flex justify-center">
        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { approveUser } = useUserApprovalStore();
      const user = row.original;

      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            size="sm"
            className=" h-8 w-8 rounded-full cursor-pointer bg-green-600 text-white"
            onClick={() => approveUser(user.id, "doctor")}
          >
            <Check className="w-4 h-4" /> 
          </Button>

          <Button
            size="sm"
            className=" h-8 w-8 bg-blue-500 cursor-pointer text-white"
            onClick={() => onRejectClick(user.id)}
          >
            <X className="w-4 h-4" /> 
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 rounded-full text-white cursor-pointer p-0 bg-rose-600 cursor-pointer hover:bg-rose-700"

            onClick={() => handleDeleteOpen(user.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
