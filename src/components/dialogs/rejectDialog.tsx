"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RejectReasonDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

export default function RejectReasonDialog({
  open,
  onClose,
  onSubmit,
}: RejectReasonDialogProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) return alert("Reason is required");
    onSubmit(reason);
    setReason("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
     <DialogContent className="sm:max-w-[400px] bg-white">
        <DialogHeader>
           <DialogTitle className="text-xl font-bold text-gray-900">Reject User</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 mb-2">Enter reason for rejection:</p>

        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason..."
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-red-600 text-white" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
