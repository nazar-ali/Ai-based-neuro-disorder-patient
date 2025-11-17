"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDoctorStore } from "@/store/useDoctorStore";
import { createUserAPI, createDoctorAPI } from "@/lib/api";

interface AddDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddDoctorDialog({ open, onOpenChange }: AddDoctorDialogProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const addDoctor = useDoctorStore((state) => state.addDoctor);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    specialization: "",
    experience: 0,
  });

  const handleAdd = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Validate required fields
      if (!form.fullName || !form.email || !form.password) {
        setMessage("❌ Full name, email, and password are required");
        return;
      }

      // STEP 1 → Create User account
      const userRes = await createUserAPI({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        role: "doctor",
      });

      const createdUserId = userRes?.data?._id;

      if (!createdUserId) {
        setMessage("❌ Failed to create user");
        return;
      }

      // STEP 2 → Create Doctor Profile
      const doctorPayload = {
        userId: createdUserId,
        fullName: form.fullName,
        email: form.email,
        specialization: form.specialization || undefined,
        experience: form.experience,
        assignedPatients: [],
        schedule: [],
      };

      const doctorRes = await addDoctor(doctorPayload);

     

      setMessage("✅ Doctor created successfully!");

      // Reset form
      setForm({
        fullName: "",
        email: "",
        password: "",
        specialization: "",
        experience: 0,
      });

      setTimeout(() => {
        onOpenChange(false);
        setMessage("");
      }, 1500);
    } catch (error: any) {
      console.error("Error adding doctor:", error);
      setMessage(`❌ Error: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] shadow-lg border border-gray-200 bg-gray-50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold text-gray-900">
            Add New Doctor
          </DialogTitle>
        </DialogHeader>

        {message && (
          <div
            className={`text-sm font-medium text-center ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <Label>Full Name</Label>
            <Input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Doctor name"
              className="mt-2"
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="doctor@example.com"
              className="mt-2"
            />
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter password"
              className="mt-2"
            />
          </div>

          {/* Specialization */}
          <div>
            <Label>Specialization</Label>
            <Input
              value={form.specialization}
              onChange={(e) =>
                setForm({ ...form, specialization: e.target.value })
              }
              placeholder="e.g. Neurologist"
              className="mt-2"
            />
          </div>

          {/* Experience */}
          <div>
            <Label>Experience (years)</Label>
            <Input
              type="number"
              value={form.experience}
              onChange={(e) =>
                setForm({ ...form, experience: Number(e.target.value) })
              }
              className="mt-2"
            />
          </div>
          

          <Button
            onClick={handleAdd}
            disabled={loading}
            className="bg-slate-500 hover:bg-slate-700 text-white w-full"
          >
            {loading ? "Saving..." : "Save Doctor"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
