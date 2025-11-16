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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createPatientAPI } from "@/lib/api"

interface AddPatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddPatientDialog({open, onOpenChange}: AddPatientDialogProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  type EmergencyContact = { name: string; relation: string; contact: string; isPrimary?: boolean }

  const [form, setForm] = useState({
    medicalRecordsId: "",
    fullName: "",
    email: "",
    // demographics
    age: "",
    sex: "",
    ethnicity: "",
    weight: "",
    height: "",
    // clinical
    medicalHistory: "",
    allergies: "",
    // relations
    contact: "",
    assignedDoctor: "",
    assignedCaretaker: "",
    // care team (comma-separated ids or names)
    careTeam_doctors: "",
    careTeam_caretakers: "",
    consent_dataSharing: false,
  })

  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type } = target
    if (type === "checkbox") {
      setForm((s) => ({ ...s, [name]: (target as HTMLInputElement).checked }))
    } else {
      setForm((s) => ({ ...s, [name]: value }))
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage("")

    try {
      // Transform form into shape expected by API/schema
      const payload: any = {
        fullName: form.fullName,
        medicalRecordsId: form.medicalRecordsId,
        age: form.age,
        sex: form.sex,
        ethnicity: form.ethnicity,
        weight: form.weight,
        height: form.height,
        medicalHistory: form.medicalHistory ? form.medicalHistory.split("\n").map(s => s.trim()).filter(Boolean) : [],
        allergies: form.allergies ? form.allergies.split(",").map(s => s.trim()).filter(Boolean) : [],
        emergencyContacts: emergencyContacts.map(c => ({ ...c })),
        consent_dataSharing: !!form.consent_dataSharing,
        careTeam_doctors: form.careTeam_doctors ? form.careTeam_doctors.split(",").map(s => s.trim()).filter(Boolean) : [],
        careTeam_caretakers: form.careTeam_caretakers ? form.careTeam_caretakers.split(",").map(s => s.trim()).filter(Boolean) : [],
        contact: form.contact,
        assignedDoctor: form.assignedDoctor,
        assignedCaretaker: form.assignedCaretaker,
      }

      const data = await createPatientAPI(payload)

      if (data) {
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
          medicalHistory: "",
          allergies: "",
          contact: "",
          assignedDoctor: "",
          assignedCaretaker: "",
          careTeam_doctors: "",
          careTeam_caretakers: "",
          consent_dataSharing: false,
        })
        setEmergencyContacts([])
      }
    } catch (error: any) {
      console.error("❌ Error adding patient:", error)
      setMessage(`❌ Error: ${error.message || "Unknown error"}`)
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

          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="john@example.com"
            />
          </div> */}

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
              name="assignedDoctor"
              value={form.assignedDoctor}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Dr. Ahmed or doctorId"
            />
          </div>

          {/* ✅ New Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned By Caretaker</label>
            <Input
              type="text"
              name="assignedCaretaker"
              value={form.assignedCaretaker}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Caretaker ID or Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Care Team — Doctors (comma separated IDs)</label>
            <Input
              type="text"
              name="careTeam_doctors"
              value={form.careTeam_doctors}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="docId1,docId2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Care Team — Caretakers (comma separated IDs)</label>
            <Input
              type="text"
              name="careTeam_caretakers"
              value={form.careTeam_caretakers}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="caretakerId1,caretakerId2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Medical History (one per line)</label>
            <Textarea
              name="medicalHistory"
              value={form.medicalHistory}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Stroke in 2019\nHypertension"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Allergies (comma separated)</label>
            <Input
              type="text"
              name="allergies"
              value={form.allergies}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Penicillin,Peanuts"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Emergency Contacts</label>
            {emergencyContacts.map((c, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-2 items-end">
                <Input placeholder="Name" value={c.name} onChange={(e)=>{
                  const v = e.target.value; setEmergencyContacts(prev=>{ const copy=[...prev]; copy[idx].name=v; return copy})
                }} />
                <Input placeholder="Relation" value={c.relation} onChange={(e)=>{ const v=e.target.value; setEmergencyContacts(prev=>{ const copy=[...prev]; copy[idx].relation=v; return copy}) }} />
                <Input placeholder="Contact" value={c.contact} onChange={(e)=>{ const v=e.target.value; setEmergencyContacts(prev=>{ const copy=[...prev]; copy[idx].contact=v; return copy}) }} />
                <div className="flex gap-2">
                  <Button type="button" onClick={()=>setEmergencyContacts(prev=>prev.filter((_,i)=>i!==idx))}>Remove</Button>
                </div>
              </div>
            ))}
            <div>
              <Button type="button" variant="ghost" onClick={()=>setEmergencyContacts(prev=>[...prev,{name:'',relation:'',contact:'',isPrimary:false}])}>
                <PlusCircle className="mr-2" /> Add contact
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox name="consent_dataSharing" checked={!!form.consent_dataSharing} onChange={(e)=> setForm(s=>({...s, consent_dataSharing: (e.target as HTMLInputElement).checked}))} />
            <label className="text-sm">Consent to share data</label>
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
