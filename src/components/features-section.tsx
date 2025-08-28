import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { assets } from "@/lib/assets/assets";
const features = [
  {
    title: "AI Chatbot",
    description:
      "Get instant answers to your questions and access personalized support through our AI-powered chatbot.",
    image: assets.aiChatbotImage,
  },
  {
    title: "MRI Analysis",
    description:
      "Upload and analyze MRI scans to track disease progression and gain deeper insights into your condition.",
    image: assets.meriBrainScanAnalysisImage,
  },
  {
    title: "Notification System",
    description:
      "Stay informed with timely notifications about appointments, medication reminders, and important updates.",
    image: assets.mobileNotificationSystemImage,
  },
  {
    title: "History Tracking",
    description:
      "Track your health journey over time with detailed records of symptoms, treatments, and progress reports.",
    image: assets.medicalHistoryTrackingImage,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 md:px-8 lg:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight mb-8">
          Key Features
        </h2>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="text-gray-900 text-3xl md:text-4xl font-bold leading-tight tracking-tight max-w-3xl">
              Comprehensive Tools for Enhanced Care
            </h3>
            <p className="text-gray-900 text-base font-normal leading-relaxed max-w-3xl">
              NeuroMind offers a suite of features designed to empower patients
              and caregivers in managing neurodegenerative disorders
              effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200 bg-white">
                <CardContent className="p-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={300}
                    className="w-full aspect-video object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h4 className="text-gray-900 text-base font-medium leading-normal mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm font-normal leading-normal">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
