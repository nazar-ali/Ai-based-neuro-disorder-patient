"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TechStackSection() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-16 bg-white">
      <div className="">
        <h2 className="text-gray-900 text-3xl font-bold leading-tight tracking-tight mb-6">
          Technology Stack
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          NeuroMind is built on a modern and scalable technology foundation, ensuring performance,
          security, and a seamless user experience. Our core stack includes:
        </p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem
            value="ai-ml"
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold">
              Artificial Intelligence & Machine Learning
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-gray-700">
              Powering personalized insights, predictive analytics, and intelligent decision support.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="cloud"
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold">
              Cloud Infrastructure
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-gray-700">
              Leveraging secure, scalable, and high-performance cloud platforms for reliable data
              storage and processing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="security"
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold">
              Data Security & Encryption
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-gray-700">
              Advanced encryption protocols and compliance-driven safeguards to protect sensitive
              patient information.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="ui"
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3 text-lg font-semibold">
              User-Centric Interface
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-gray-700">
              Intuitive, accessible, and responsive design for effortless navigation across devices.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
