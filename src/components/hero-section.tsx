import { Button } from "@/components/ui/button"
import Image from "next/image"
import {assets} from "@/utils/assets/assets";
export default function HeroSection() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-8">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative min-h-[480px] flex flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 md:p-12"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${assets.MRIImage.src})`,
          }}
        >
          <div className="flex flex-col gap-4 text-center max-w-4xl">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-balance">
              Empowering Neurodegenerative Disorder Patients with AI
            </h1>
            <p className="text-white text-base md:text-lg font-normal leading-relaxed max-w-3xl mx-auto text-pretty">
              NeuroMind is an AI-powered platform designed to support patients and caregivers in managing
              neurodegenerative disorders. Our innovative tools provide personalized insights, streamline communication,
              and enhance care coordination.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="bg-white/90 hover:bg-white text-gray-900 font-bold px-8">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
