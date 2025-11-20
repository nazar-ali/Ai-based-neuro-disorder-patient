"use client";

import { useEffect } from "react";
import { DataTable } from "./DataTable";
import { approvedColumns } from "./admin/approvedColumns";
import { useUserApprovalStore } from "@/store/userApproval";

export default function ApprovedUsers() {
  const {
    approvedUsers,
    loading,
    error,
    fetchApprovedUsers,
  } = useUserApprovalStore();

  // Fetch approved users on mount
  useEffect(() => {
    fetchApprovedUsers();
  }, [fetchApprovedUsers]);

//   // Loading State
//   if (loading) {
//     return <p className="text-center py-10">Loading approved users...</p>;
//   }

//   // Error State
//   if (error) {
//     return (
//       <p className="text-center py-10 text-red-600 font-medium">
//         {error}
//       </p>
//     );
//   }

  // Empty State
  if (!approvedUsers || approvedUsers.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        No approved users found.
      </p>
    );
  }

  return (
    <DataTable 
      columns={approvedColumns} 
      data={approvedUsers}
      loading={loading}
    />
  );
}
