"use client";

import { useState } from "react";
import { useCaretakerStore } from "@/store/useCareTaker";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddCaretakerDialogProps } from "@/types/careTaker";
import { toast } from "sonner";

export default function AddCaretakerDialog({ open, onOpenChange }: AddCaretakerDialogProps) {
  const { addCaretaker, loading } = useCaretakerStore();
   
  const [form, setForm] = useState({
    userId: "",
    fullName: "",
    email: "",
    password: "",
    contactNo: "",
    // accept comma-separated ids in the input, we'll convert to array on submit
    assignedPatients: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");

    if (
      !form.userId ||
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.contactNo
    ) {
      setError("All fields are required!");
      return;
    }

    // convert comma separated string -> array of trimmed ids, remove empty strings
    const assignedPatientsArray = form.assignedPatients
      ? form.assignedPatients.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    // prepare payload expected by your API/store
    const payload = {
      userId: form.userId,
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      contactNo: form.contactNo,
      assignedPatients: assignedPatientsArray,
    };

    const res = await addCaretaker(payload);
    if (res.success) {
      toast.success("Caretaker created successfully 🎉");
       onOpenChange(false);
        setForm({
      userId: "",
      fullName: "",
      email: "",
      password: "",
      contactNo: "",
      assignedPatients: "",
    });
    } else {
      toast.error(res.message || "Failed to add caretaker");
    }

    
   
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create Caretaker
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* User ID */}
          <div>
            <Label>User ID</Label>
            <Input
              name="userId"
              placeholder="Enter User ID"
              value={form.userId}
              onChange={handleChange}
            />
          </div>

          {/* Full Name */}
          <div>
            <Label>Full Name</Label>
            <Input
              name="fullName"
              placeholder="Caretaker Name"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="caretaker@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Strong Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Contact No */}
          <div>
            <Label>Contact No</Label>
            <Input
              name="contactNo"
              placeholder="+92312XXXXXXXX"
              value={form.contactNo}
              onChange={handleChange}
            />
          </div>

          {/* Assigned Patients */}
          <div>
            <Label>Assigned Patients</Label>
            <Input
              name="assignedPatients"
              placeholder="Comma separated patient IDs (e.g. id1, id2)"
              value={form.assignedPatients}
              onChange={handleChange}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Enter patient IDs separated by commas (optional).
            </p>
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Caretaker"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
