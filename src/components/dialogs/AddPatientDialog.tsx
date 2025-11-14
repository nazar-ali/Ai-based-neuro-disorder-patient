"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Save, PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface AddPatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddPatientDialog({open, onOpenChange}: AddPatientDialogProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [form, setForm] = useState({
    medicalRecordsId: "",
    fullName: "",
    email: "",
    age: "",
    sex: "",
    ethnicity: "",
    weight: "",
    height: "",
    contact: "",
    doctorAssigned: "",
    assignedByCaretaker: "", // ✅ Added new field
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage("✅ Patient added successfully!")
        setTimeout(() => onOpenChange(false), 1500)
        setForm({
          medicalRecordsId: "",
          fullName: "",
          email: "",
          age: "",
          sex: "",
          ethnicity: "",
          weight: "",
          height: "",
          contact: "",
          doctorAssigned: "",
          assignedByCaretaker: "",
        })
      } else {
        setMessage(`❌ Error: ${data.message}`)
      }
    } catch {
      setMessage("❌ Network error or invalid data.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed sm:max-w-[700px] p-6 rounded-2xl shadow-lg border border-gray-200 bg-white">
         <div className="p-2 overflow-auto max-h-[80vh]">
        <DialogHeader>
         <DialogTitle className="text-3xl font-extrabold flex items-center gap-3 text-gray-900 dark:text-gray-50">Add New Patient</DialogTitle>
          <DialogDescription  className="text-sm flex items-center gap-3 text-gray-900 dark:text-gray-50">Fill out all patient details below.</DialogDescription>
        </DialogHeader>

        {message && (
          <p className="text-sm text-center font-medium text-gray-600">{message}</p>
        )}

        {/* Form Fields */}
        <form className="space-y-3 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Medical Record ID</label>
            <Input
              type="text"
              name="medicalRecordsId"
              value={form.medicalRecordsId}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="e.g. MR-12345"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <Input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="john@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <Input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sex</label>
              <Input
                type="text"
                name="sex"
                value={form.sex}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Male / Female"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ethnicity</label>
              <Input
                type="text"
                name="ethnicity"
                value={form.ethnicity}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Asian"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact</label>
              <Input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="03001234567"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <Input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <Input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder="170"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned Doctor</label>
            <Input
              type="text"
              name="doctorAssigned"
              value={form.doctorAssigned}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Dr. Ahmed"
            />
          </div>

          {/* ✅ New Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned By Caretaker</label>
            <Input
              type="text"
              name="assignedByCaretaker"
              value={form.assignedByCaretaker}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Caretaker ID or Name"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-sm transition-all"
            >
              {loading ? "Saving..." : <><Save className="h-4 w-4 mr-2" /> Save</>}
            </Button>
          </div>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
