"use client";

import { InputField } from "./common/InputField";
import { SectionCard } from "./common/SectionCard";
import { updateFormState } from "@/utils/formUtils";
import { PatientInfoProps } from "@/types/patientFormtypes";

const PatientInfo = ({ form, setForm }: PatientInfoProps) => {
  const handleChange = (key: string, value: any, parent?: string, index?: number) => {
    setForm((prev) => updateFormState(prev, key, value, parent, index));
  };

  return (
    <SectionCard title="Demographics">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <InputField
          id="medicalRecordsId"
          label="Medical Record ID"
          value={form.medicalRecordsId}
          placeholder="Enter unique record ID"
          onChange={(e) => handleChange("medicalRecordsId", e.target.value)}
        />

        <InputField
          id="age"
          label="Age"
          type="number"
          placeholder="Enter age"
          value={form.demographics.age}
          onChange={(e) => handleChange("age", e.target.value, "demographics")}
        />

        <InputField
          id="sex"
          label="Sex"
          placeholder="Enter gender"
          value={form.demographics.sex}
          onChange={(e) => handleChange("sex", e.target.value, "demographics")}
        />

        <InputField
          id="ethnicity"
          label="Ethnicity"
          placeholder="Enter ethnicity"
          value={form.demographics.ethnicity}
          onChange={(e) => handleChange("ethnicity", e.target.value, "demographics")}
        />

        <InputField
          id="weight"
          label="Weight (kg)"
          type="number"
          placeholder="Enter weight"
          value={form.demographics.weight}
          onChange={(e) => handleChange("weight", e.target.value, "demographics")}
        />

        <InputField
          id="height"
          label="Height (cm)"
          type="number"
          placeholder="Enter height"
          value={form.demographics.height}
          onChange={(e) => handleChange("height", e.target.value, "demographics")}
        />
      </div>
    </SectionCard>
  );
};

export default PatientInfo;
