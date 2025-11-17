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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedCaretaker.fullName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p>
            <strong>ID:</strong> {selectedCaretaker.userId}
          </p>
          <p>
            <strong>Email:</strong> {selectedCaretaker.email}
          </p>
          <p>
            <strong>Contact:</strong> {selectedCaretaker.contactNo}
          </p>

          <p className="font-semibold mt-3">Assigned Patients:</p>
          <ul className="list-disc ml-6">
            {selectedCaretaker.assignedPatients?.length ? (
              selectedCaretaker.assignedPatients.map((p: any) => (
                <li key={p._id}>{p.fullName ?? p._id}</li>
              ))
            ) : (
              <li>No patients</li>
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
