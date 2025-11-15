// "use client";

// import React from "react";
// import DoctorPatients from "@/components/dashboard/DoctorPatients";
// import { useSignedInUser } from "@/store/useSignedInUser";

// export default function DoctorPatientsPage() {
//   const user = useSignedInUser();

//   // user should contain _id for logged-in doctor
//   const doctorId = user?._id || "";

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Doctor Portal — Patients</h1>
//       {doctorId ? <DoctorPatients doctorId={doctorId} /> : <p>Please login as a doctor to view patients.</p>}
//     </div>
//   );
// }
