"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/store/useDoctorStore";
import { useDoctorStore } from "@/store/useDoctorStore";
import ConfirmDeleteDialog from "@/components/dialogs/ConfirmDeleteDialog";

export const doctorColumns: ColumnDef<Doctor, any>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => <span className="text-sm">{row.original._id}</span>,
  },
  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.fullName}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.email}</span>,
  },
  {
    accessorKey: "specialization",
    header: "Specialization",
    cell: ({ row }) => <span>{row.original.specialization || "—"}</span>,
  },
  {
    accessorKey: "experienceYears",
    header: "Experience (yrs)",
    cell: ({ row }) => <span>{row.original.experienceYears ?? 0}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const DoctorRowActions = require("@/components/dashboard/DoctorRowActions").default;
      return <DoctorRowActions doctor={row.original} />;
    },
  },
];
