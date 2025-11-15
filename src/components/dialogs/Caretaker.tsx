"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, PlusCircle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AddCaretakerDialogProps,
  CaretakerForm,
  DailySummary,
} from "@/types/careTaker";
import { createCaretakerAPI } from "@/lib/api";

export default function AddCaretakerDialog({
  open,
  onOpenChange,
}: AddCaretakerDialogProps) {
  const [form, setForm] = useState<CaretakerForm>({
    assignedPatient: "",
    dailySummaries: [{ date: "", summary: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSummaryChange = (
    index: number,
    field: keyof DailySummary,
    value: string
  ) => {
    const updated = [...form.dailySummaries];
    updated[index][field] = value;
    setForm({ ...form, dailySummaries: updated });
  };

  const addSummary = () =>
    setForm({
      ...form,
      dailySummaries: [...form.dailySummaries, { date: "", summary: "" }],
    });

  const removeSummary = (index: number) => {
    if (form.dailySummaries.length === 1) return;
    setForm({
      ...form,
      dailySummaries: form.dailySummaries.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        assignedPatient: form.assignedPatient,
        dailySummaries: form.dailySummaries.filter(s => s.date && s.summary),
      };

      if (!payload.assignedPatient || payload.dailySummaries.length === 0) {
        setMessage("❌ Please fill in all required fields");
        return;
      }

      await createCaretakerAPI(payload);
      
      setMessage("✅ Caretaker added successfully!");
      setForm({
        assignedPatient: "",
        dailySummaries: [{ date: "", summary: "" }],
      });
      
      setTimeout(() => {
        onOpenChange(false);
        setMessage("");
      }, 1500);
    } catch (error: any) {
      console.error("Error adding caretaker:", error);
      setMessage(`❌ Error: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-sm transition-all">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Caretaker
        </Button>
      </DialogTrigger>

      {/* Dialog */}
      <DialogContent className="fixed sm:max-w-[700px] p-6 rounded-2xl shadow-lg border border-gray-200 bg-white">
        <div className="p-2 overflow-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle  className="text-3xl font-extrabold flex items-center gap-3 text-gray-900 dark:text-gray-50">
            Add New Caretaker
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Assign a caretaker to a patient and record daily summaries.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Assigned Patient */}
          <section className="space-y-2">
            <h3 className="text-lg font-medium text-gray-800 ">
              Assigned Patient
            </h3>
            <Input
              name="assignedPatient"
              placeholder="Enter patient ObjectId or name"
              value={form.assignedPatient}
              onChange={(e) =>
                setForm({ ...form, assignedPatient: e.target.value })
              }
              className="border-gray-300 focus-visible:ring-amber-500"
            />
          </section>

          {/* Daily Summaries */}
          <section className="space-y-3">
            <h3 className="text-lg font-medium text-gray-800 ">
              Daily Summaries
            </h3>

            {form.dailySummaries.map((summary, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200 relative"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Entry #{index + 1}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeSummary(index)}
                    disabled={form.dailySummaries.length === 1}
                    className="text-red-500 hover:text-red-600 hover:bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={summary.date}
                      onChange={(e) =>
                        handleSummaryChange(index, "date", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-gray-600">
                      Summary
                    </label>
                    <Textarea
                      placeholder="Write a brief summary..."
                      value={summary.summary}
                      onChange={(e) =>
                        handleSummaryChange(index, "summary", e.target.value)
                      }
                      className="mt-1 min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addSummary}
              className="w-full border-amber-600 text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Another Summary
            </Button>
          </section>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 shadow-md transition-all"
            >
              {loading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Caretaker</>}
            </Button>
          </div>

          {message && (
            <p className="text-center text-sm font-medium text-gray-600">
              {message}
            </p>
          )}
        </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
