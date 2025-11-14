// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// interface Doctor {
//   _id: string;
//   userId: { fullName: string; email: string };
//   specialization: string;
//   licenseNumber?: string;
//   experienceYears: number;
// }

// export default function DoctorsPage() {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [open, setOpen] = useState(false);
//   const [form, setForm] = useState({
//     userId: "",
//     specialization: "",
//     licenseNumber: "",
//     experienceYears: 0,
//   });

//   // Fetch doctors
//   useEffect(() => {
//     axios.get("/api/doctors").then((res) => setDoctors(res.data));
//   }, []);

//   // Add doctor
//   const handleAdd = async () => {
//     try {
//       await axios.post("/api/doctors", form);
//       setOpen(false);
//       setForm({ userId: "", specialization: "", licenseNumber: "", experienceYears: 0 });
//       const res = await axios.get("/api/doctors");
//       setDoctors(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-8 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold">Doctors Management</h1>
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//           <Button
//   className="bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-sm transition-all"
// >
//   Add Doctor
// </Button>

//           </DialogTrigger>
//           <DialogContent className="sm:max-w-md bg-gray-50">
//             <DialogHeader>
//               <DialogTitle>Add New Doctor</DialogTitle>
//             </DialogHeader>

//             <div className="space-y-4 ">
//               <div>
//                 <Label>User ID</Label>
//                 <Input
//                   value={form.userId}
//                   onChange={(e) => setForm({ ...form, userId: e.target.value })}
//                   placeholder="Enter User ID"
//                   className="mt-2"
//                 />
//               </div>

//               <div>
//                 <Label>Specialization</Label>
//                 <Input
//                   value={form.specialization}
//                   onChange={(e) => setForm({ ...form, specialization: e.target.value })}
//                   placeholder="e.g. Neurologist"
//                                     className="mt-2"

//                 />
//               </div>

//               <div>
//                 <Label>License Number</Label>
//                 <Input
//                   value={form.licenseNumber}
//                   onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
//                   placeholder="Optional"
//                                     className="mt-2"

//                 />
//               </div>

//               <div>
//                 <Label>Experience (years)</Label>
//                 <Input
//                   type="number"
//                   value={form.experienceYears}
//                   onChange={(e) =>
//                     setForm({ ...form, experienceYears: Number(e.target.value) })
//                   }
//                                     className="mt-2"

//                 />
//               </div>

//               <Button className="bg-slate-400 w-full text-md hover:bg-slate-600 text-white font-medium shadow-sm transition-all">
// Save</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Doctors Table */}
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Specialization</TableHead>
//               <TableHead>License #</TableHead>
//               <TableHead>Experience</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {doctors.map((doc) => (
//               <TableRow key={doc._id}>
//                 <TableCell>{doc.userId?.fullName || "N/A"}</TableCell>
//                 <TableCell>{doc.userId?.email || "N/A"}</TableCell>
//                 <TableCell>{doc.specialization}</TableCell>
//                 <TableCell>{doc.licenseNumber || "-"}</TableCell>
//                 <TableCell>{doc.experienceYears} yrs</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
