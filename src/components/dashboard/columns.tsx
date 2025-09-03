"use client";

import { ColumnDef } from "@tanstack/react-table";
import { JSX } from "react";

type Alert = {
  id: string;
  type: string;
  severity: JSX.Element
  timestamp: string;
};

export const alertColumns: ColumnDef<Alert>[] = [
  {
    accessorKey: "id",
    header: "Patient ID",
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: "type",
    header: "Alert Type",
    cell: ({ row }) => <span>{row.original.type}</span>,
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => <span className="capitalize">{row.original.severity}</span>,
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => <span>{row.original.timestamp}</span>,
  },
];


type Activity = {
  id: string;
  activity: string;
  timestamp: string;
};

export const activityColumns: ColumnDef<Activity>[] = [
  {
    accessorKey: "id",
    header: "Patient ID",
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: "activity",
    header: "Activity",
    cell: ({ row }) => <span>{row.original.activity}</span>,
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => <span>{row.original.timestamp}</span>,
  },
];
