import { useEffect } from "react";
import {DataTable }from "./DataTable";
import { rejectedColumns } from "./admin/rejectColumns";
import { useUserApprovalStore } from "@/store/userApproval";

export default function RejectedUsers() {
  const { rejectUsers,fetchRejectedUsers } = useUserApprovalStore();
  useEffect(()=> {
    fetchRejectedUsers()
  },[])

  return <DataTable columns={rejectedColumns} data={rejectUsers} />;
}
