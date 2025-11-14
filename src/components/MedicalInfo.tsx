"use client"

import { useRef } from "react"
import { SectionCard } from "./common/SectionCard"
import { InputField } from "./common/InputField"
import { updateFormState } from "@/utils/formUtils"
import { Button } from "./ui/button"
import { Plus, Trash2 } from "lucide-react"
import { PatientInfoProps } from "@/types/patientFormtypes"

const MedicalInfo: React.FC<PatientInfoProps> = ({ form, setForm }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const handleChange = (key: string, value: any, parent?: string, index?: number) => {
    setForm((prev) => updateFormState(prev, key, value, parent, index))
  }

  const addEmergencyContact = () => {
    setForm((prev) => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { name: "", relation: "", contact: "", isPrimary: false },
      ],
    }))
    // ✅ Scroll to top after adding
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0
    }, 100)
  }

  const removeEmergencyContact = (index: number) => {
    setForm((prev) => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index),
    }))
  }

  return (
    <SectionCard title="Emergency Contacts">
      <p className="text-sm text-gray-500 mb-4">
        Add contact details for people to reach in case of medical emergencies.
      </p>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className=" overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        {form.emergencyContacts.map((contact, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mb-5 p-5"
          >
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-medium text-gray-700">
                Emergency Contact {index + 1}
                {contact.isPrimary && (
                  <span className="ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                    Primary
                  </span>
                )}
              </h4>

              {form.emergencyContacts.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEmergencyContact(index)}
                  className="hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                id={`ec-name-${index}`}
                label="Full Name"
                value={contact.name}
                placeholder="Enter full name"
                onChange={(e) =>
                  handleChange("name", e.target.value, "emergencyContacts", index)
                }
              />

              <InputField
                id={`ec-relation-${index}`}
                label="Relation"
                value={contact.relation}
                placeholder="e.g. Father, Sister"
                onChange={(e) =>
                  handleChange("relation", e.target.value, "emergencyContacts", index)
                }
              />

              <InputField
                id={`ec-contact-${index}`}
                label="Contact Number"
                value={contact.contact}
                placeholder="03XX-XXXXXXX"
                onChange={(e) =>
                  handleChange("contact", e.target.value, "emergencyContacts", index)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end ">
        <Button
          type="button"
          onClick={addEmergencyContact}
          variant="outline"
          className="border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Another Contact
        </Button>
      </div>
    </SectionCard>
  )
}

export default MedicalInfo
