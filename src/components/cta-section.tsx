import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-balance">
              Ready to Take Control of Your Health Journey?
            </h2>
            <p className="text-gray-900 text-base font-normal leading-relaxed max-w-3xl mx-auto text-pretty">
              Join NeuroMind today and experience the power of AI in managing neurodegenerative disorders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-bold flex-1">
              Sign Up
            </Button>
            <Button size="lg" variant="outline" className="font-bold flex-1 bg-transparent">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
