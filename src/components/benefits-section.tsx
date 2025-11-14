import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Clock } from "lucide-react"

const benefits = [
  {
    icon: Heart,
    title: "Enhanced Patient Well-being",
    description:
      "Patients experience improved symptom management, increased independence, and a greater sense of control over their health.",
  },
  {
    icon: Users,
    title: "Streamlined Care Coordination",
    description:
      "Caregivers benefit from improved communication, reduced stress, and better coordination of care activities.",
  },
  {
    icon: Clock,
    title: "Time-Saving Tools",
    description:
      "NeuroMind's efficient tools save time and effort, allowing patients and caregivers to focus on what matters most.",
  },
]

export default function BenefitsSection() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-16 bg-gray-50">
      <div className="">
        <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight mb-8">
          Benefits for Patients and Caregivers
        </h2>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="text-gray-900 text-3xl md:text-4xl font-bold leading-tight tracking-tight max-w-3xl text-balance">
              Improved Quality of Life
            </h3>
            <p className="text-gray-900 text-base font-normal leading-relaxed max-w-3xl text-pretty">
              NeuroMind is designed to improve the quality of life for both patients and caregivers by providing tools
              for better management and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={index} className="border border-gray-200 bg-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <IconComponent key={index} className="w-6 h-6 text-blue-300" />
                      <div className="flex flex-col gap-2">
                        <h4 className="text-gray-900 text-base font-bold leading-tight">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm font-normal leading-normal">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
