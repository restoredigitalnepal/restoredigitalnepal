"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md shadow-lg border-b border-red-600/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 overflow-hidden rounded-full border-2 border-red-500 group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/images/revolution.png"
                alt="Restore Digital Nepal"
                width={40}
                height={40}
                className="w-10 h-10 object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-protest text-white text-lg tracking-wide">
                Restore Digital Nepal
              </span>
              <span className="text-xs text-red-400 font-semibold">#EnoughIsEnough</span>
            </div>
          </a>

          {/* Desktop Navigation - Simplified */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/about"
              className="text-white hover:text-red-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-red-600/10"
            >
              About
            </a>
            <a
              href="/privacy"
              className="text-white hover:text-red-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-red-600/10"
            >
              Privacy
            </a>

            {/* Action Buttons - Cleaner */}
            <div className="flex items-center space-x-4 ml-4">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
                onClick={() => { window.location.href = "/#petition" }}
              >
                Sign Petition
              </Button>
              <Button
                variant="outline"
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold px-6 py-2 rounded-full bg-transparent transition-all duration-300"
                onClick={() => { window.location.href = "/#join-team" }}
              >
                Join Movement
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-400 hover:bg-red-600/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Improved */}
        {isOpen && (
          <div className="md:hidden border-t border-red-600/30">
            <div className="px-2 pt-4 pb-4 space-y-3 bg-black/95 backdrop-blur-md">
              <a
                href="/about"
                className="block px-4 py-3 text-white hover:text-red-400 font-medium hover:bg-red-600/10 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                href="/privacy"
                className="block px-4 py-3 text-white hover:text-red-400 font-medium hover:bg-red-600/10 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Privacy
              </a>
              <div className="flex flex-col space-y-3 px-2 pt-3 border-t border-red-600/20">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full"
                  onClick={() => {
                    window.location.href = "/#petition"
                    setIsOpen(false)
                  }}
                >
                  Sign Petition
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold rounded-full bg-transparent"
                  onClick={() => {
                    window.location.href = "/#join-team"
                    setIsOpen(false)
                  }}
                >
                  Join Movement
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

