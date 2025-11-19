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
import { createUserAPI } from "@/lib/api";
import { Plus, Minus } from "lucide-react";

interface AddDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ScheduleField = "day" | "start" | "end";

export default function AddDoctorDialog({
  open,
  onOpenChange,
}: AddDoctorDialogProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const addDoctor = useDoctorStore((state) => state.addDoctor);

  const [form, setForm] = useState({
    doctorId: "",
    fullName: "",
    email: "",
    password: "",
    specialization: "",
    experience: 0,
    assignedPatients: [""],
    schedule: [{ day: "", start: "", end: "" }],
  });

  // Update schedule row
  const updateSchedule = (index: number, field: ScheduleField, value: string) => {
    const updated = [...form.schedule];
    updated[index][field] = value;
    setForm({ ...form, schedule: updated });
  };

  const addScheduleRow = () => {
    setForm({
      ...form,
      schedule: [...form.schedule, { day: "", start: "", end: "" }],
    });
  };

  const removeScheduleRow = (index: number) => {
    if (form.schedule.length === 1) return;
    setForm({
      ...form,
      schedule: form.schedule.filter((_, i) => i !== index),
    });
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      setMessage("");

      if (!form.doctorId || !form.fullName || !form.email || !form.password) {
        setMessage("❌ Doctor ID, full name, email, and password are required");
        return;
      }

      // STEP 1 → Create user
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

      const payload = {
        doctorId: form.doctorId,
        userId: createdUserId,
        fullName: form.fullName,
        email: form.email,
        specialization: form.specialization,
        experience: form.experience,
        assignedPatients: form.assignedPatients.filter((p) => p.trim() !== ""),
        schedule: form.schedule,
      };

      await addDoctor(payload);

      setMessage("✅ Doctor created successfully!");

      // Reset
      setForm({
        doctorId: "",
        fullName: "",
        email: "",
        password: "",
        specialization: "",
        experience: 0,
        assignedPatients: [""],
        schedule: [{ day: "", start: "", end: "" }],
      });

      setTimeout(() => {
        onOpenChange(false);
        setMessage("");
      }, 1500);
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg p-6">

        {/* Sticky Header */}
        <DialogHeader className=" bg-white pt-2 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            Add New Doctor
          </DialogTitle>
        </DialogHeader>

        {/* Status Message */}
        {message && (
          <div
            className={`mt-3 text-sm font-medium text-center ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form Content */}
        <div className="space-y-6 pt-4">

          {/* Section: Basic Info */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl shadow-sm">
            <div>
              <Label>Doctor ID</Label>
              <Input
                placeholder="DR-001"
                value={form.doctorId}
                onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Full Name</Label>
              <Input
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Specialization</Label>
              <Input
                value={form.specialization}
                onChange={(e) =>
                  setForm({ ...form, specialization: e.target.value })
                }
                className="mt-2"
              />
            </div>

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
          </div>

          {/* Section: Assigned Patients */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Label className="font-semibold text-lg">Assigned Patients</Label>
            {form.assignedPatients.map((p, index) => (
              <div key={index} className="flex gap-2 mt-3">
                <Input
                  value={p}
                  onChange={(e) => {
                    const arr = [...form.assignedPatients];
                    arr[index] = e.target.value;
                    setForm({ ...form, assignedPatients: arr });
                  }}
                  placeholder="Patient ID"
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    setForm({
                      ...form,
                      assignedPatients: [...form.assignedPatients, ""],
                    })
                  }
                >
                  <Plus size={18} />
                </Button>
                <Button
                  variant="destructive"
                  disabled={form.assignedPatients.length === 1}
                  onClick={() =>
                    setForm({
                      ...form,
                      assignedPatients: form.assignedPatients.filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                >
                  <Minus size={18} />
                </Button>
              </div>
            ))}
          </div>

          {/* Section: Schedule */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Label className="font-semibold text-lg">Doctor Schedule</Label>

            {form.schedule.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-3 mt-3">
                <Input
                  placeholder="Day"
                  value={item.day}
                  onChange={(e) => updateSchedule(index, "day", e.target.value)}
                />
                <Input
                  type="time"
                  value={item.start}
                  onChange={(e) =>
                    updateSchedule(index, "start", e.target.value)
                  }
                />
                <Input
                  type="time"
                  value={item.end}
                  onChange={(e) => updateSchedule(index, "end", e.target.value)}
                />

                <Button
                  variant="destructive"
                  disabled={form.schedule.length === 1}
                  onClick={() => removeScheduleRow(index)}
                >
                  <Minus size={18} />
                </Button>
              </div>
            ))}

            <Button
              onClick={addScheduleRow}
              variant="outline"
              className="mt-3 cursor-pointer bg-green-400 hover:bg-green-500"
            >
              Add Schedule
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleAdd}
            disabled={loading}
            className="w-full py-3 text-lg font-semibold mt-4 bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Doctor"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
