import { Twitter, Facebook, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-10">
        <div className="flex flex-col gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-around">
            <a
              className="text-gray-600 text-base font-normal hover:text-gray-900 transition-colors min-w-40"
              href="#privacy"
            >
              Privacy Policy
            </a>
            <a
              className="text-gray-600 text-base font-normal hover:text-gray-900 transition-colors min-w-40"
              href="#terms"
            >
              Terms of Service
            </a>
            <a
              className="text-gray-600 text-base font-normal hover:text-gray-900 transition-colors min-w-40"
              href="#contact"
            >
              Contact Us
            </a>
          </div>

          <div className="flex justify-center gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>

          <p className="text-gray-600 text-base font-normal">© 2024 NeuroMind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
