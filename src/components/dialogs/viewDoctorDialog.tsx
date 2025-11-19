"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Doctor } from "@/types/doctor";

interface ViewDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;   // correct prop
  doctor: Doctor | null;
}

export default function ViewDoctorDialog({
  open,
  onOpenChange,
  doctor,
}: ViewDoctorDialogProps) {
  if (!doctor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Doctor Details
          </DialogTitle>
          <DialogDescription>
            Full information about the selected doctor.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] pr-3">

          {/* BASIC INFO */}
          <div className="space-y-3 mt-2">
            <h3 className="font-semibold text-gray-900">Basic Information</h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <p><span className="font-medium">Name:</span> {doctor.fullName}</p>
              <p><span className="font-medium">Email:</span> {doctor.email}</p>

              <p><span className="font-medium">Specialization:</span> {doctor.specialization}</p>
              <p>
                <span className="font-medium">Experience:</span>{" "}
                {doctor.experience} years
              </p>
            </div>
          </div>

          {/* ASSIGNED PATIENTS */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Assigned Patients
            </h3>

            {doctor.assignedPatients?.length === 0 ? (
              <p className="text-sm text-muted-foreground">No assigned patients.</p>
            ) : (
              <div className="space-y-2">
                {doctor.assignedPatients.map((p: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{p.fullName}</p>
                      <p className="text-xs text-muted-foreground">{p.email}</p>
                    </div>
                    <Badge variant="secondary">{p.age} yrs</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SCHEDULE */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Schedule</h3>

            {doctor.schedule?.length === 0 ? (
              <p className="text-sm text-muted-foreground">No schedule available.</p>
            ) : (
              <ul className="list-disc ml-6 text-sm">
                {doctor.schedule.map((item: any, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>

        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
