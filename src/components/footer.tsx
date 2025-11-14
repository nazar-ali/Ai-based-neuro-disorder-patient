"use client"

import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className=" mx-auto px-6 md:px-12 lg:px-20 py-12 space-y-12">

        {/* --- Top Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* About Us */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 uppercase">About Us</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              NeuroMind is an AI-powered platform designed to support patients and caregivers in
              managing neurodegenerative disorders. Our innovative tools provide personalized
              insights, streamline communication, and enhance care coordination.
            </p>
          </div>

          {/* Our Schedule */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 uppercase">Our Schedule</h2>
            <ul className="space-y-2 text-gray-600 text-sm">
              {[
                "Monday: 9:00 AM - 6:00 PM",
                "Tuesday: 9:00 AM - 6:00 PM",
                "Wednesday: 9:00 AM - 6:00 PM",
                "Thursday: 9:00 AM - 6:00 PM",
                "Friday: 9:00 AM - 5:00 PM",
                "Saturday: 10:00 AM - 3:00 PM",
                "Sunday: Closed",
              ].map((day) => (
                <li key={day} className="hover:text-indigo-600 transition-colors">
                  {day}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 uppercase">Quick Links</h2>
            <ul className="space-y-2 text-gray-600 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Features", href: "/features" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-indigo-600 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 uppercase">Get in Touch</h2>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-600" />
                <a href="mailto:support@neuromind.ai" className="hover:text-indigo-600">
                  support@neuromind.ai
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-600" />
                <a href="tel:+1234567890" className="hover:text-indigo-600">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span>123 Neuro Street, San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300" />

        {/* --- Bottom Section --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Social Section */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-gray-700 font-medium text-sm md:mr-4">Follow Us:</p>
            <div className="flex gap-5">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Youtube, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="p-2 bg-gray-100 rounded-full hover:bg-indigo-600 hover:text-white transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-sm text-center">
            © {new Date().getFullYear()} <span className="font-semibold text-indigo-600">NeuroMind</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
