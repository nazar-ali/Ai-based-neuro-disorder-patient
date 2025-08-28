import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 px-4 py-3 md:px-10">
      <div className="flex items-center gap-4 text-gray-900">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
          </svg>
        </div>
        <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-tight">NeuroMind</h2>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <nav className="hidden md:flex items-center gap-9">
          <a className="text-gray-900 text-sm font-medium hover:text-blue-600 transition-colors" href="#home">
            Home
          </a>
          <a className="text-gray-900 text-sm font-medium hover:text-blue-600 transition-colors" href="#features">
            Features
          </a>
          <a className="text-gray-900 text-sm font-medium hover:text-blue-600 transition-colors" href="#about">
            About Us
          </a>
          <a className="text-gray-900 text-sm font-medium hover:text-blue-600 transition-colors" href="#contact">
            Contact
          </a>
        </nav>

        <div className="flex gap-2">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold">Sign Up</Button>
          <Button variant="outline" className="font-bold bg-transparent">
            Log In
          </Button>
        </div>
      </div>
    </header>
  )
}
