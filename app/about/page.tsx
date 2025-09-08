"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingDown, BookOpen, Globe } from "lucide-react"

const bannedPlatforms = [
  { name: "Facebook", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg" },
  { name: "Instagram", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" },
  { name: "X (Twitter)", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg" },
  { name: "YouTube", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg" },
  { name: "WhatsApp", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/whatsapp.svg" },
  { name: "TikTok", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg" },
  { name: "LinkedIn", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" },
  { name: "Snapchat", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/snapchat.svg" },
  { name: "Telegram", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/telegram.svg" },
  { name: "Discord", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-6 py-3 mb-8">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold text-lg">Crisis Information</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-protest text-white mb-8 leading-tight">
              About the
              {" "}
              <span className="block text-red-500 mt-2">
                Digital Ban
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
              Understanding the scope and impact of Nepal's unprecedented digital censorship on millions of citizens.
            </p>
          </div>

          {/* Banned Platforms Section */}
          <div className="mb-20 ">
            <div className="bg-black/60 backdrop-blur-sm border border-red-600/20 rounded-2xl p-8 mb-12">
              <h2 className="text-4xl font-bold text-white font-protest mb-8 flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded-full " />
                26 Platforms Under Ban
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                {bannedPlatforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="bg-red-600/10 border border-red-600/30 rounded-xl p-6 text-center hover:bg-red-600/20 transition-colors duration-300 relative overflow-hidden group"
                  >
                    <div className="relative z-10">
                      <img
                        src={platform.logo}
                        alt={platform.name}
                        className="w-8 h-8 mx-auto mb-3 filter invert opacity-60"
                      />
                      <span className="text-white font-semibold text-sm">{platform.name}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-60">
                      <div className="w-full h-0.5 bg-red-500 transform rotate-45" />
                      <div className="w-full h-0.5 bg-red-500 transform -rotate-45 absolute" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <div className="text-red-400 font-bold text-2xl mb-2">All platforms banned by government decree</div>
                <div className="text-gray-400 text-xl">Affecting over 30 million Nepali internet users</div>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-black/60 backdrop-blur-sm border border-red-600/20 rounded-2xl p-8 text-center">
              <TrendingDown className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <div className="text-4xl font-black text-red-500 mb-3">30M+</div>
              <div className="text-white text-xl font-semibold mb-2">Users Affected</div>
              <div className="text-gray-400">Citizens cut off from global communication</div>
            </div>

            <div className="bg-black/60 backdrop-blur-sm border border-yellow-600/20 rounded-2xl p-8 text-center">
              <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-4xl font-black text-yellow-500 mb-3">2</div>
              <div className="text-white text-xl font-semibold mb-2">Constitutional Articles</div>
              <div className="text-gray-400">Fundamental rights being violated</div>
            </div>

            <div className="bg-black/60 backdrop-blur-sm border border-blue-600/20 rounded-2xl p-8 text-center">
              <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <div className="text-4xl font-black text-blue-500 mb-3">100K+</div>
              <div className="text-white text-xl font-semibold mb-2">Youth Rising</div>
              <div className="text-gray-400">Young people demanding change</div>
            </div>
          </div>

          {/* Constitutional Rights */}
          <div className="mb-20">
            <div className="bg-black/60 backdrop-blur-sm border border-yellow-600/20 rounded-2xl p-8">
              <h2 className="text-4xl font-bold text-white mb-8 font-protest">Constitutional Rights Violated</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-xl p-6">
                  <h3 className="text-yellow-300 font-bold text-2xl mb-4 font-protest">Article 17(2)(a)</h3>
                  <p className="text-white text-lg mb-4">
                    "Every citizen shall, subject to the sovereignty, integrity and dignity of Nepal,
                    the security of the State and public order, have the right to freedom of opinion and expression."
                  </p>
                  <div className="text-yellow-200 font-medium">
                    Guarantees freedom of expression for all citizens
                  </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-6">
                  <h3 className="text-blue-300 font-bold text-2xl mb-4 font-protest">Article 19</h3>
                  <p className="text-white text-lg mb-4">
                    "Every citizen shall have the right to be informed about matters of public importance
                    and to access information."
                  </p>
                  <div className="text-blue-200 font-medium">
                    Ensures right to communication and information
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <div className="bg-black/60 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8">
              <h2 className="text-4xl font-bold text-white mb-8 font-protest">Timeline of Digital Censorship</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-6">
                  <div className="text-red-400 font-bold text-xl mb-2">November 2024</div>
                  <div className="text-white text-lg mb-2 font-protest">Mass Platform Bans Initiated</div>
                  <div className="text-gray-400">
                    Government begins systematic blocking of major social media and communication platforms
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <div className="text-yellow-400 font-bold text-xl mb-2">December 2024</div>
                  <div className="text-white text-lg mb-2 font-protest">Youth Protests Begin</div>
                  <div className="text-gray-400">
                    Students and young professionals start organizing resistance movements
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <div className="text-blue-400 font-bold text-xl mb-2">January 2025</div>
                  <div className="text-white text-lg mb-2 font-protest">Digital Rights Movement Forms</div>
                  <div className="text-gray-400">
                    #EnoughIsEnough campaign launches to restore constitutional rights
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-black/60 backdrop-blur-sm border border-red-600/20 rounded-2xl p-12">
              <h2 className="text-4xl font-bold text-white mb-6 font-protest">
                The Fight for Digital Freedom Continues
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
                This is not just about social media. It's about our fundamental right to communicate,
                express ourselves, and access information as guaranteed by our Constitution.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-6 rounded-full"
                  onClick={() => (window.location.href = "/#petition")}
                >
                  Sign the Petition
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-xl px-12 py-6 rounded-full bg-transparent"
                  onClick={() => (window.location.href = "/#join-team")}
                >
                  Join the Movement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
