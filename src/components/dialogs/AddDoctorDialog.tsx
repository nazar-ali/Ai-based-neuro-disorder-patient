"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { on } from "events";

interface Doctor {
  _id: string;
  userId: { fullName: string; email: string };
  specialization: string;
  licenseNumber?: string;
  experienceYears: number;
}

interface AddDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function AddDoctorDialog({open, onOpenChange}: AddDoctorDialogProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState({
    userId: "",
    specialization: "",
    licenseNumber: "",
    experienceYears: 0,
  });

  // Fetch doctors
  useEffect(() => {
    axios.get("/api/doctors").then((res) => setDoctors(res.data));
  }, []);

  // Add doctor
  const handleAdd = async () => {
    try {
      await axios.post("/api/doctors", form);
      onOpenChange(false);
      setForm({ userId: "", specialization: "", licenseNumber: "", experienceYears: 0 });
      const res = await axios.get("/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[500px] shadow-lg border border-gray-200 bg-gray-50">
            <DialogHeader>
              <DialogTitle className="text-3xl font-extrabold flex items-center gap-3 text-gray-900 dark:text-gray-50">Add New Doctor</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 ">
              <div>
                <Label>User ID</Label>
                <Input
                  value={form.userId}
                  onChange={(e) => setForm({ ...form, userId: e.target.value })}
                  placeholder="Enter User ID"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Specialization</Label>
                <Input
                  value={form.specialization}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                  placeholder="e.g. Neurologist"
                                    className="mt-2"

                />
              </div>

              <div>
                <Label>License Number</Label>
                <Input
                  value={form.licenseNumber}
                  onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
                  placeholder="Optional"
                                    className="mt-2"

                />
              </div>

              <div>
                <Label>Experience (years)</Label>
                <Input
                  type="number"
                  value={form.experienceYears}
                  onChange={(e) =>
                    setForm({ ...form, experienceYears: Number(e.target.value) })
                  }
                                    className="mt-2"

                />
              </div>

              <Button className="bg-slate-400 w-full text-md hover:bg-slate-600 text-white font-medium shadow-sm transition-all">
Save</Button>
            </div>
          </DialogContent>
        </Dialog>
     
  );
}
