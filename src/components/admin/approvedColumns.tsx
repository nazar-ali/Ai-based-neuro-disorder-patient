"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import type { UserRow } from "./pendingColumns";

export const approvedColumns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge className="bg-green-100 text-green-800">
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: () => (
      <Badge className="bg-green-200 text-green-900">Approved</Badge>
    ),
  },
];
