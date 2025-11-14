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