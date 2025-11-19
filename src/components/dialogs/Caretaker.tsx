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

export default function AddCaretakerDialog({
  open,
  onOpenChange,
}: AddCaretakerDialogProps) {
  const { addCaretaker, caretakerLoading } = useCaretakerStore();

  const [form, setForm] = useState({
    userId: "",
    fullName: "",
    email: "",
    password: "",
    contactNo: "",
    assignedPatients: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.userId || !form.fullName || !form.email || !form.password || !form.contactNo) {
      setError("All fields are required!");
      return;
    }

    const assignedPatientsArray = form.assignedPatients
      ? form.assignedPatients.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

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
      <DialogContent className="max-w-lg bg-white rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-2xl font-bold">Create Caretaker</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">

          {/* SECTION 1: Account Info */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Account Info</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>User ID</Label>
                <Input
                  name="userId"
                  placeholder="Enter User ID"
                  value={form.userId}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Full Name</Label>
                <Input
                  name="fullName"
                  placeholder="Caretaker Name"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="caretaker@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Strong Password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Contact Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Contact Details</h3>

            <Label>Contact Number</Label>
            <Input
              name="contactNo"
              placeholder="+92 312 0000000"
              value={form.contactNo}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* SECTION 3: Assigned Patients */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Assigned Patients</h3>

            <Label>Patient IDs (comma separated)</Label>
            <Input
              name="assignedPatients"
              placeholder="patient1, patient2, patient3"
              value={form.assignedPatients}
              onChange={handleChange}
              className="mt-1"
            />

            <p className="text-xs text-muted-foreground mt-1">
              Optional — Add multiple IDs separated by commas.
            </p>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={handleSubmit}
            disabled={caretakerLoading}
            className="bg-blue-600 hover:bg-blue-700 w-full py-3"
          >
            {caretakerLoading ? "Creating..." : "Create Caretaker"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
