"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Users, Globe } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)

  const stats = [
    { id: "stat-1", number: "26", label: "Platforms Banned" },
    { id: "stat-2", number: "30M+", label: "Voices Silenced" },
    { id: "stat-3", number: "100K+", label: "Youth Rising" },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [stats.length])

  const scrollToPetition = () => {
    document.getElementById("petition")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToJoin = () => {
    document.getElementById("join-team")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Hero Content Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-10">
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

            {/* Flag Badge - Clean Design */}
            <div className="inline-flex items-center gap-3 bg-black/60 backdrop-blur-sm border border-red-600/30 rounded-full px-8 py-4 mb-12">
              <span className="text-3xl">🇳🇵</span>
              <span className="text-white font-semibold text-lg">For Nepal's Digital Freedom</span>
              <span className="text-3xl">🇳🇵</span>
            </div>

            {/* Main Headline - Bold and Clean with Custom Font */}
            <div className="mb-16">
              <h1 className="font-protest text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-6 leading-tight tracking-wide">
                <span className="block text-red-500 drop-shadow-lg">
                  #EnoughIsEnough
                </span>
              </h1>
              <h2 className="font-protest text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-8 opacity-90 tracking-wide">
                Restore Digital Nepal
              </h2>
            </div>            {/* Stats Display - Clean Minimal */}
            <div className="mb-16">
              <div className="bg-black/70 backdrop-blur-lg border border-red-600/20 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.id}
                      className={`text-center transition-all duration-700 ${currentStat === index ? 'scale-110 opacity-100' : 'scale-100 opacity-70'
                        }`}
                    >
                      <div className="text-5xl md:text-6xl font-black text-red-500 mb-3">
                        {stat.number}
                      </div>
                      <div className="text-white text-xl font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Constitutional Quote - Professional */}
            <div className="mb-16 max-w-5xl mx-auto font-protest">
              <div className="bg-black/60 backdrop-blur-sm border-l-4 border-red-500 rounded-r-2xl p-8">
                <blockquote className="text-2xl md:text-3xl text-white font-semibold mb-4 italic">
                  "Every citizen shall have the right to <span className="text-red-400 font-bold">freedom of opinion and expression</span>"
                </blockquote>
                <cite className="text-red-300 text-xl font-medium">
                  - Article 17(2)(a), Constitution of Nepal
                </cite>
              </div>
            </div>

            {/* Call to Action Buttons - Reduced Height */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                onClick={scrollToPetition}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-10 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-red-500"
              >
                <span className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  Sign the Petition
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={scrollToJoin}
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-10 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 bg-transparent"
              >
                <span className="flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  Join Movement
                </span>
              </Button>
            </div>

            {/* Hashtags - Minimal Design */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-lg border-2 border-red-500">
                  #EnoughIsEnough
                </span>
                <span className="bg-black/60 text-white px-6 py-4 rounded-full font-semibold border border-white/30 ">
                  #RestoreDigitalNepal
                </span>
                <span className="bg-black/60 text-white px-6 py-4 rounded-full font-semibold border border-white/30">
                  #DigitalRights
                </span>
                <span className="bg-black/60 text-white px-6 py-4 rounded-full font-semibold border border-white/30">
                  #YouthVoice
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Image Section - Separate from Hero */}
      <section >
              <Image
                src="/images/youth-unchained.png"
                alt="Youth Unchained - Digital Freedom Movement"
                width={1200}
                height={800}
                className="w-full h-[30vw] object-contain"
                priority
              />
      </section>
    </>
  )
}
