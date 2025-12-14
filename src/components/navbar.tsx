"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center">
              <span className="text-black font-bold text-xl">P</span>
            </div>
            <span className="text-white font-bold text-xl">POS System</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              About
            </Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              How It Works
            </Link>
            <Link href="/faq" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#8E7525] hover:bg-[#A38A2E] text-white">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#D4AF37]">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-[#D4AF37]">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-300 hover:text-[#D4AF37] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-300 hover:text-[#D4AF37] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/how-it-works"
              className="block text-gray-300 hover:text-[#D4AF37] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/faq"
              className="block text-gray-300 hover:text-[#D4AF37] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="block text-gray-300 hover:text-[#D4AF37] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 space-y-2 border-t border-[#D4AF37]/30">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37] bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-[#8E7525] hover:bg-[#A38A2E] text-white">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
