"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import type { UserRow } from "./pendingColumns";

export const rejectedColumns: ColumnDef<UserRow>[] = [
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
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: () => (
      <Badge className="bg-red-200 text-red-900">Rejected</Badge>
    ),
  },
];
