"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Edit,
  Save,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Upload,
  Camera,
} from "lucide-react"

/**
 * Professional ProfilePage optimized for sidebar layout.
 * - Fits inside sidebar: uses h-full, flex layout and internal scroll (overflow-y-auto).
 * - TypeScript-safe event handlers.
 * - Modern card-based design with sticky header, consistent spacing and responsive grid.
 */

type Profile = {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string // ISO date string
  address: string
  emergencyContact: string
  allergies: string
  medications: string
  medicalConditions: string
  insuranceProvider: string
  insuranceId: string
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<Profile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-06-15",
    address: "123 Main St, City, State 12345",
    emergencyContact: "Jane Doe - (555) 987-6543",
    allergies: "Penicillin, Shellfish",
    medications: "Lisinopril 10mg daily",
    medicalConditions: "Hypertension",
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceId: "BC123456789",
  })

  const handleSave = () => {
    // TODO: send profile to backend
    setIsEditing(false)
    console.log("Profile saved:", profile)
  }

  // small generic updater to avoid repeating object spreads
  const updateField = (key: keyof Profile, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      {/* Sticky header to give dashboard feel */}
      {/* <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 py-3"> */}
       
         

          <div className="flex justify-end gap-2">
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
          </div>
        
      {/* </div> */}

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto max-h-[65vh] px-4 md:px-8 py-6 bg-gradient-to-br from-blue-50/30 to-white">
        <div className=" mx-auto space-y-6">
          {/* Top grid: summary + details */}
          <div className="grid gap-6  items-start">
            {/* Summary card */}
           <Card className="shadow-lg border border-gray-100 rounded-2xl bg-gradient-to-b from-white to-gray-50 hover:shadow-xl transition-all duration-300">
      {/* Profile Header */}
      <CardHeader className="flex flex-col items-center text-center ">
        <div className="relative w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center mb-4 shadow-sm">
          <User className="h-14 w-14 text-blue-600" />
          <button
            className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700 transition"
            title="Change photo"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {profile.firstName} {profile.lastName}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 font-medium">
          Patient ID: #P001234
        </CardDescription>
      </CardHeader>

      {/* Profile Details */}
      <CardContent className="space-y-5 px-6 pb-6">
        <InfoRow icon={<Mail size={16} />} label="Email" value={profile.email} />
        <InfoRow icon={<Phone size={16} />} label="Phone" value={profile.phone} />
        <InfoRow
          icon={<Calendar size={16} />}
          label="Date of Birth"
          value={new Date(profile.dateOfBirth).toLocaleDateString()}
        />
        <InfoRow icon={<MapPin size={16} />} label="Address" value={profile.address} />

        {/* Upload Section */}
        <div className="border-t border-gray-200 pt-4">
          <label className="text-xs uppercase tracking-wide text-gray-500 block mb-2">
            Profile Photo
          </label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                <Upload className="h-4 w-4 text-gray-500" />
              </div>
              <span className="text-sm text-gray-600">No photo uploaded</span>
            </div>
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
              Change
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

            {/* Detailed info column */}
            <div className="space-y-6">
              <SectionCard title="Personal Information" description="Basic personal & contact details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    id="firstName"
                    label="First Name"
                    value={profile.firstName}
                    disabled={!isEditing}
                    onChange={(e) => updateField("firstName", e.target.value)}
                  />
                  <InputField
                    id="lastName"
                    label="Last Name"
                    value={profile.lastName}
                    disabled={!isEditing}
                    onChange={(e) => updateField("lastName", e.target.value)}
                  />
                  <InputField
                    id="email"
                    label="Email"
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                  <InputField
                    id="phone"
                    label="Phone"
                    value={profile.phone}
                    disabled={!isEditing}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                  <div className="md:col-span-2">
                    <InputField
                      id="address"
                      label="Address"
                      value={profile.address}
                      disabled={!isEditing}
                      onChange={(e) => updateField("address", e.target.value)}
                    />
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                title="Medical Information"
                description="Medical history, allergies & current medications"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    id="allergies"
                    label="Allergies"
                    value={profile.allergies}
                    disabled={!isEditing}
                    onChange={(e) => updateField("allergies", e.target.value)}
                  />
                  <InputField
                    id="emergencyContact"
                    label="Emergency Contact"
                    value={profile.emergencyContact}
                    disabled={!isEditing}
                    onChange={(e) => updateField("emergencyContact", e.target.value)}
                  />
                  <div className="md:col-span-2">
                    <TextField
                      id="medications"
                      label="Current Medications"
                      value={profile.medications}
                      disabled={!isEditing}
                      onChange={(e) => updateField("medications", e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <TextField
                      id="medicalConditions"
                      label="Medical Conditions"
                      value={profile.medicalConditions}
                      disabled={!isEditing}
                      onChange={(e) => updateField("medicalConditions", e.target.value)}
                    />
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Insurance" description="Provider and policy details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    id="insuranceProvider"
                    label="Provider"
                    value={profile.insuranceProvider}
                    disabled={!isEditing}
                    onChange={(e) => updateField("insuranceProvider", e.target.value)}
                  />
                  <InputField
                    id="insuranceId"
                    label="Policy ID"
                    value={profile.insuranceId}
                    disabled={!isEditing}
                    onChange={(e) => updateField("insuranceId", e.target.value)}
                  />
                </div>
              </SectionCard>
            </div>
          </div>

          {/* optional footer actions (kept minimal) */}
          <div className="flex items-center justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => console.log("Export PDF")}>
              Export
            </Button>
            <Button
              onClick={() => {
                setIsEditing(false)
                // reset or other action
              }}
              size="sm"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------
   Reusable small components
   ------------------------- */

function InfoRow({ icon, label, value, small = false }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-muted-foreground">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700">{label}</div>
        </div>
        <div className={small ? "text-xs text-gray-600" : "text-sm text-gray-800"}>{value}</div>
      </div>
    </div>
  )
}

function SectionCard({ title, description, children }: any) {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-2xl bg-white">
      <CardHeader className="px-6 pt-5 pb-2">
        <CardTitle className="text-sm font-semibold text-gray-900">{title}</CardTitle>
        <CardDescription className="text-xs text-gray-500">{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2 space-y-4">{children}</CardContent>
    </Card>
  )
}

function InputField({
  id,
  label,
  value,
  onChange,
  disabled,
  type = "text",
}: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  type?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="bg-white"
      />
    </div>
  )
}

function TextField({
  id,
  label,
  value,
  onChange,
  disabled,
}: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Textarea id={id} value={value} onChange={onChange} disabled={disabled} rows={3} />
    </div>
  )
}
