"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Patient, EmergencyContact } from "@/types/patientFormtypes";

interface ViewPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export default function ViewPatientModal({
  isOpen,
  onClose,
  patient,
}: ViewPatientModalProps) {
  if (!patient) return null;

  const demographics = patient.demographics || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] bg-white rounded-xl shadow-xl border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-slate-900 tracking-tight">
            Patient Overview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-slate-800 max-h-[75vh] overflow-y-auto pr-2 pb-4">

          <div className="grid gap-6">

            {/* BASIC INFO */}
            <section className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-semibold text-lg text-slate-900 mb-3 tracking-tight">
                Basic Information
              </h3>

              <div className="space-y-1 text-[15px] leading-tight">
                <p><span className="font-medium text-slate-700">Full Name:</span> {patient.fullName}</p>
                <p><span className="font-medium text-slate-700">Medical Record ID:</span> {patient.medicalRecordsId}</p>
                <p>
                  <span className="font-medium text-slate-700">Created At:</span>{" "}
                  {new Date(patient.createdAt).toLocaleString()}
                </p>
              </div>
            </section>

            {/* DEMOGRAPHICS */}
            <section className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-semibold text-lg text-slate-900 mb-3 tracking-tight">
                Demographics
              </h3>

              <div className="grid grid-cols-2 gap-y-2 text-[15px] leading-tight">
                <p><span className="font-medium text-slate-700">Age:</span> {demographics.age ?? "—"}</p>
                <p><span className="font-medium text-slate-700">Sex:</span> {demographics.sex ?? "—"}</p>
                <p><span className="font-medium text-slate-700">Height:</span> {demographics.height ? `${demographics.height} cm` : "—"}</p>
                <p><span className="font-medium text-slate-700">Weight:</span> {demographics.weight ? `${demographics.weight} kg` : "—"}</p>
              </div>
            </section>

            {/* MEDICAL HISTORY */}
            <section className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-semibold text-lg text-slate-900 mb-3 tracking-tight">
                Medical History
              </h3>

              <p className="text-[15px] leading-relaxed text-slate-700">
                {patient.medicalHistory.length > 0
                  ? patient.medicalHistory.join(", ")
                  : "No medical history recorded."}
              </p>
            </section>

            {/* ALLERGIES */}
            <section className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-semibold text-lg text-slate-900 mb-3 tracking-tight">
                Allergies
              </h3>

              <p className="text-[15px] leading-relaxed text-slate-700">
                {patient.allergies.length > 0
                  ? patient.allergies.join(", ")
                  : "No known allergies."}
              </p>
            </section>

            {/* ASSIGNED */}
            <section className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-semibold text-lg text-slate-900 mb-3 tracking-tight">
                Assignments
              </h3>

              <div className="space-y-1 text-[15px] leading-tight">
                <p>
                  <span className="font-medium text-slate-700">Assigned Doctor:</span>{" "}
                  {patient.assignedDoctor ?? "—"}
                </p>
                <p>
                  <span className="font-medium text-slate-700">Assigned Caretaker:</span>{" "}
                  {patient.assignedCaretaker ?? "—"}
                </p>
              </div>
            </section>

            {/* CARE TEAM */}
            <section className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-semibold text-lg text-slate-900 mb-3 tracking-tight">
                Care Team
              </h3>

              <div className="space-y-1 text-[15px] leading-tight">
                <p>
                  <span className="font-medium text-slate-700">Doctors:</span>{" "}
                  {patient.careTeam_doctors.length > 0
                    ? patient.careTeam_doctors.join(", ")
                    : "No additional doctors."}
                </p>

                <p>
                  <span className="font-medium text-slate-700">Caretakers:</span>{" "}
                  {patient.careTeam_caretakers.length > 0
                    ? patient.careTeam_caretakers.join(", ")
                    : "No additional caretakers."}
                </p>
              </div>
            </section>

            {/* EMERGENCY CONTACTS */}
            <section className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-semibold text-lg text-slate-900 mb-3 tracking-tight">
                Emergency Contacts
              </h3>

              {patient.emergencyContacts.length > 0 ? (
                patient.emergencyContacts.map((c: EmergencyContact, i: number) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-white border shadow-sm mt-2"
                  >
                    <p className="text-sm leading-tight"><span className="font-medium text-slate-700">Name:</span> {c.name}</p>
                    <p className="text-sm leading-tight"><span className="font-medium text-slate-700">Phone:</span> {c.contact}</p>
                    <p className="text-sm leading-tight"><span className="font-medium text-slate-700">Relation:</span> {c.relation}</p>
                    <p className="text-sm leading-tight"><span className="font-medium text-slate-700">Primary:</span> {c.isPrimary ? "Yes" : "No"}</p>
                  </div>
                ))
              ) : (
                <p className="text-[15px] text-slate-700">No emergency contacts available.</p>
              )}
            </section>

            {/* CONSENT */}
            <section className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="font-semibold text-lg text-slate-900 mb-3 tracking-tight">
                Consent
              </h3>

              <p className="text-[15px] leading-tight">
                <span className="font-medium text-slate-700">Data Sharing:</span>{" "}
                {patient.consent_dataSharing ? "Allowed" : "Not Allowed"}
              </p>
            </section>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
