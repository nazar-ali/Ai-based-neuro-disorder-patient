export interface DailySummary {
  date: string;
  summary: string;
}

export interface CaretakerForm {
  assignedPatient: string;
  dailySummaries: DailySummary[];
}

export interface AddCaretakerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface Caretaker {
  _id: string;
  fullName: string;
  email?: string;
  assignedPatients?: Array<{ _id: string; fullName?: string }>;
  patientSummary?: string; // generic summary field if you keep per-caretaker summary
  createdAt?: string;
}