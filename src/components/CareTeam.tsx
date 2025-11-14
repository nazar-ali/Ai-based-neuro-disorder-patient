"use client";

import { SectionCard } from "./common/SectionCard";
import { Textarea } from "./ui/textarea";
import { updateFormState } from "@/utils/formUtils";
import { Label } from "./ui/label";
import { PatientInfoProps } from "@/types/patientFormtypes";

const CareTeam: React.FC<PatientInfoProps> = ({ form, setForm }) => {
  const handleChange = (key: string, value: any, parent?: string, index?: number) => {
    setForm((prev) => updateFormState(prev, key, value, parent, index));
  };

  return (
    <SectionCard title="Care Team">
      <p className="text-sm text-gray-500 mb-4">
        Enter the unique IDs of doctors and caretakers responsible for the patient’s care.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doctor IDs */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="doctor-ids" className="font-medium text-gray-700">
            Assigned Doctor IDs
          </Label>
          <Textarea
            id="doctor-ids"
            placeholder="e.g. 64b8dfe12a0f, 64c9acb23bd7"
            value={form.careTeam_doctors.join(", ")}
            className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            onChange={(e) =>
              handleChange(
                "careTeam_doctors",
                e.target.value.split(",").map((id) => id.trim())
              )
            }
          />
          <p className="text-xs text-gray-400">
            Separate multiple IDs with commas.
          </p>
        </div>

        {/* Caretaker IDs */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="caretaker-ids" className="font-medium text-gray-700">
            Assigned Caretaker IDs
          </Label>
          <Textarea
            id="caretaker-ids"
            placeholder="e.g. 64b8cde33dfe, 64f9bda42ae8"
            value={form.careTeam_caretakers.join(", ")}
            className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            onChange={(e) =>
              handleChange(
                "careTeam_caretakers",
                e.target.value.split(",").map((id) => id.trim())
              )
            }
          />
          <p className="text-xs text-gray-400">
            Separate multiple IDs with commas.
          </p>
        </div>
      </div>
    </SectionCard>
  );
};

export default CareTeam;
