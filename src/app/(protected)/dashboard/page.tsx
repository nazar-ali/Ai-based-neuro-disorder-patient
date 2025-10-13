'use client'

// import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import  {DataTable}  from "@/components/DataTable";
import { activityColumns, alertColumns } from "@/components/dashboard/columns";
import { useState } from "react";
import ProtectedRoute from "../layout";

export default function DashboardPage() {
    const [rowsPerPage, setRowsPerPage] = useState("10");
  const alerts = [
    {
      id: "PT12345",
      type: "Abnormal MRI Scan Detected",
      severity: (
        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          High
        </span>
      ),
      timestamp: "2024-01-15 10:30 AM",
    },
    {
      id: "PT67890",
      type: "Increased Cognitive Decline",
      severity: (
        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Medium
        </span>
      ),
      timestamp: "2024-01-14 03:45 PM",
    },
  ];

  const activities = [
    {
      id: "PT12345",
      activity: "MRI Scan Uploaded",
      timestamp: "2024-01-15 09:00 AM",
    },
    {
      id: "PT67890",
      activity: "Cognitive Assessment Completed",
      timestamp: "2024-01-14 02:00 PM",
    },
  ];

  return (
     <div className="p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold  mb-2">
          Dashboard Overview
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Monitor patient activities and recent alerts.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <DataTable
          title="Recent Alerts"
          columns={alertColumns}
          data={alerts}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={ () => setRowsPerPage}
        />

        {/* <DataTable
          title="Patient Activities"
          columns={activityColumns}
          data={activities}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={() => setRowsPerPage}
        /> */}
      </div>
    </div>
  );
}
