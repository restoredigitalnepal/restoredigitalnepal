"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Users, Globe } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)

  const stats = [
    { id: "stat-1", number: "20+", label: "Lives Lost" },
    { id: "stat-2", number: "26", label: "Platforms Banned" },
    { id: "stat-3", number: "30M+", label: "Voices Silenced" },
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

            {/* Emblem Badge - Logo focused */}
            <div className="inline-flex items-center gap-4 bg-black/60 backdrop-blur-sm border border-red-600/30 rounded-full px-6 py-3 mb-12">
              <span className="block h-px w-10 bg-red-500/60" />
              <div className="w-14 h-14 overflow-hidden rounded-full ring-2 ring-red-500/60 shadow-md">
                <Image
                  src="/images/revolution.png"
                  alt="Restore Digital Nepal"
                  width={56}
                  height={56}
                  className="w-14 h-14 object-cover"
                  priority
                />
              </div>
              <span className="block h-px w-10 bg-red-500/60" />
            </div>

            {/* Main Headline - Bold and Clean with Custom Font */}
            <div className="mb-16">
              <h1 className="font-protest text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-6 leading-tight tracking-wide">
                <span className="block text-red-500 drop-shadow-lg">
                  #EnoughIsEnough
                </span>
              </h1>
              <h2 className="font-protest text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 opacity-90 tracking-wide">
                Hold Corrupt Leaders Accountable
              </h2>
              <p className="text-xl md:text-2xl text-red-300 mb-8 font-medium">
                They silenced our voices, took our children, but they cannot break our spirit
              </p>
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

            {/* Memorial Quote - Emotional */}
            <div className="mb-16 max-w-5xl mx-auto font-protest">
              <div className="bg-black/60 backdrop-blur-sm border-l-4 border-red-500 rounded-r-2xl p-8">
                <blockquote className="text-2xl md:text-3xl text-white font-semibold mb-4 italic">
                  "In memory of those who <span className="text-red-400 font-bold">gave their lives</span> for our country Nepal"
                </blockquote>
                <cite className="text-red-300 text-xl font-medium">
                  - Never forget, never forgive the corrupt leaders who took them from us
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

            {/* Hashtags - Emotional Design */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-lg border-2 border-red-500">
                  #EnoughIsEnough
                </span>
                <span className="bg-black/60 text-white px-6 py-4 rounded-full font-semibold border border-white/30">
                  #JusticeForTheFallen
                </span>
                <span className="bg-black/60 text-white px-6 py-4 rounded-full font-semibold border border-white/30">
                  #CorruptLeadersMustGo
                </span>
                <span className="bg-black/60 text-white px-6 py-4 rounded-full font-semibold border border-white/30">
                  #NeverForget
                </span>
                <span className="bg-black/60 text-white px-6 py-4 rounded-full font-semibold border border-white/30">
                  #DigitalRights
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
