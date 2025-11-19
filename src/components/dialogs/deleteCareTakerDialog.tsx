"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCaretakerStore } from "@/store/useCareTaker";
import { toast } from "sonner";
import { Caretaker } from "@/types/careTaker";
import { DialogDescription } from "@radix-ui/react-dialog";

interface DeleteCaretakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  caretaker: Caretaker | null;   // ✅ add this
}


export default function DeleteCaretakerModal({
  isOpen,
  onClose,
}: DeleteCaretakerModalProps) {
  const { selectedCaretaker, deleteCaretaker } = useCaretakerStore();

  if (!selectedCaretaker) return null;

  const handleDelete = async () => {
const result = await deleteCaretaker(selectedCaretaker._id!);

    if (result.success) {
      toast.success("Caretaker deleted successfully");
      onClose();
    } else {
      toast.error(result.message || "Failed to delete caretaker");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-white">
        <DialogHeader>
           <DialogTitle className="text-xl font-bold text-gray-900">Delete Caretaker</DialogTitle>
        </DialogHeader>

       
          <DialogDescription className="text-gray-600 text-sm">
            Are you sure you want to delete{" "}
          <strong>{selectedCaretaker.fullName}</strong>?
          </DialogDescription>
        
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" className="bg-blue-200" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" className="bg-rose-500" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
