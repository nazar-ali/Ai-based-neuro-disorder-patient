"use client";

import { useCaretakerStore } from "@/store/useCareTaker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Caretaker } from "@/types/careTaker";

interface ViewCaretakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  caretaker: Caretaker | null;
}

export default function ViewCaretakerModal({
  isOpen,
  onClose,
}: ViewCaretakerModalProps) {
  const { selectedCaretaker } = useCaretakerStore();

  if (!selectedCaretaker) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {selectedCaretaker.fullName}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Caretaker Profile Overview
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Info */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Basic Details</h3>

            <div className="mt-3 space-y-2 text-sm">
              <p>
                <span className="font-medium text-gray-700">ID:</span> {selectedCaretaker.userId}
              </p>
              <p>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {selectedCaretaker.email}
              </p>
              <p>
                <span className="font-medium text-gray-700">Contact:</span>{" "}
                {selectedCaretaker.contactNo}
              </p>
            </div>
          </div>

          {/* Assigned Patients */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Assigned Patients
            </h3>

            <ul className="mt-3 text-sm space-y-1 list-inside">
              {selectedCaretaker.assignedPatients?.length ? (
                selectedCaretaker.assignedPatients.map((p: any) => (
                  <li
                    key={p._id}
                    className="px-3 py-1 rounded-md bg-white border border-gray-200 shadow-sm text-gray-700"
                  >
                    {p.fullName ?? p._id}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No assigned patients</li>
              )}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
