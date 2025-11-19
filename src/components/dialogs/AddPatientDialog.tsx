"use client"

import React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import { Plus, Save, Trash2 } from "lucide-react"
import { createPatientAPI } from "@/lib/api"
import { PatientSchema, PatientFormType} from "@/components/schemas/adminSchema/addPatientFormSchema"



interface AddPatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/* ------------------------------------------------------ */

export default function AddPatientDialog({ open, onOpenChange }: AddPatientDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<PatientFormType>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      medicalRecordsId: "",
      fullName: "",
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
      emergencyContacts: [{ name: "", relation: "", contact: "" }],
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContacts"
  })

  const onSubmit = async (data: PatientFormType) => {
    const payload = {
      ...data,
      medicalHistory: data.medicalHistory
        ? data.medicalHistory.split("\n").map(s => s.trim())
        : [],
      allergies: data.allergies
        ? data.allergies.split(",").map(s => s.trim())
        : [],
      careTeam_doctors: data.careTeam_doctors
        ? data.careTeam_doctors.split(",").map(s => s.trim())
        : [],
      careTeam_caretakers: data.careTeam_caretakers
        ? data.careTeam_caretakers.split(",").map(s => s.trim())
        : [],
    }

    await createPatientAPI(payload)
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6">

        
        <DialogHeader className="bg-white pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">Add New Patient</DialogTitle>
          <DialogDescription>Fill out the required information.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">

          {/* SECTION: Patient Info */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Label className="font-semibold text-lg">Patient Info</Label>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <Label>Medical Record ID</Label>
                <Input {...register("medicalRecordsId")} className="mt-2" />
                {errors.medicalRecordsId && (
                  <p className="text-red-500 text-sm">{errors.medicalRecordsId.message}</p>
                )}
              </div>

              <div>
                <Label>Full Name</Label>
                <Input {...register("fullName")} className="mt-2" />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Label>Contact</Label>
                <Input {...register("contact")} className="mt-2" />
                {errors.contact && (
                  <p className="text-red-500 text-sm">{errors.contact.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* SECTION: Demographics */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Label className="font-semibold text-lg">Demographics</Label>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <Label>Age</Label>
                <Input type="number" {...register("age")} className="mt-2" />
              </div>

              <div>
                <Label>Sex</Label>
                <Input {...register("sex")} className="mt-2" />
              </div>

              <div>
                <Label>Ethnicity</Label>
                <Input {...register("ethnicity")} className="mt-2" />
              </div>

              <div>
                <Label>Height (cm)</Label>
                <Input type="number" {...register("height")} className="mt-2" />
              </div>

              <div>
                <Label>Weight (kg)</Label>
                <Input type="number" {...register("weight")} className="mt-2" />
              </div>
            </div>
          </div>

          {/* SECTION: Medical Details */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Label className="font-semibold text-lg">Medical Details</Label>

            <div className="mt-3">
              <Label>Allergies (comma separated)</Label>
              <Input {...register("allergies")} className="mt-2" />
            </div>

            <div className="mt-3">
              <Label>Medical History (one per line)</Label>
              <Textarea {...register("medicalHistory")} className="mt-2" />
            </div>
          </div>

          {/* SECTION: Emergency Contacts */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Label className="font-semibold text-lg">Emergency Contacts</Label>

            {fields.map((field, idx) => (
              <div
                key={field.id}
                className="grid grid-cols-2 gap-3 mt-4 border p-3 rounded-lg bg-white"
              >
                <div>
                  <Label>Name</Label>
                  <Input
                    {...register(`emergencyContacts.${idx}.name`)}
                    className="mt-1"
                  />
                  {errors.emergencyContacts?.[idx]?.name && (
                    <p className="text-red-500 text-sm">
                      {errors.emergencyContacts[idx]?.name?.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Relation</Label>
                  <Input
                    {...register(`emergencyContacts.${idx}.relation`)}
                    className="mt-1"
                  />
                  {errors.emergencyContacts?.[idx]?.relation && (
                    <p className="text-red-500 text-sm">
                      {errors.emergencyContacts[idx]?.relation?.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <Label>Contact Number</Label>
                  <Input
                    {...register(`emergencyContacts.${idx}.contact`)}
                    className="mt-1"
                  />
                  {errors.emergencyContacts?.[idx]?.contact && (
                    <p className="text-red-500 text-sm">
                      {errors.emergencyContacts[idx]?.contact?.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2 flex items-center justify-end mt-2">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(idx)}
                    className="h-9 w-9 bg-red-100 text-red-600"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              className="mt-4 w-full bg-gray-400"
              onClick={() =>
                append({ name: "", relation: "", contact: "" })
              }
            >
              <Plus size={18} className="mr-1" /> Add New Emergency
            </Button>
          </div>

          {/* SECTION: Assignments */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <Label className="font-semibold text-lg">Assignments</Label>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <Label>Assigned Doctor</Label>
                <Input {...register("assignedDoctor")} className="mt-2" />
              </div>

              <div>
                <Label>Assigned Caretaker</Label>
                <Input {...register("assignedCaretaker")} className="mt-2" />
              </div>

              <div>
                <Label>Care Team Doctors</Label>
                <Input {...register("careTeam_doctors")} className="mt-2" />
              </div>

              <div>
                <Label>Care Team Caretakers</Label>
                <Input {...register("careTeam_caretakers")} className="mt-2" />
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="flex items-center gap-2">
            <Checkbox {...register("consent_dataSharing")} />
            <Label>Consent to share data</Label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-lg font-semibold mt-4 bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Saving..." : (<><Save size={18} className="mr-2" /> Save Patient</>)}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  )
}
