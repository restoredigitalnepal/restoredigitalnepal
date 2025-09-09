"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function CommunitySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-red-600/10 border border-red-600/30 rounded-full px-8 py-4 mb-8">
            <Image
              src="/images/revolution.png"
              alt="Revolution Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-red-400 font-semibold text-lg">Join the Revolution</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight font-protest">
            Unite for
            <span className="block text-red-500 mt-2">
              the country Nepal
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Connect with fellow revolutionaries, share updates, and coordinate actions across our communities.
          </p>
        </div>

        {/* Community Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Discord Community */}
          <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm border border-indigo-600/30 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 font-protest">Discord Community</h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Join our active Discord server for real-time discussions, strategy planning, and coordination with fellow revolutionaries.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-indigo-300">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Real-time voice & text chat</span>
                </div>
                <div className="flex items-center gap-3 text-indigo-300">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Strategy discussions</span>
                </div>
                <div className="flex items-center gap-3 text-indigo-300">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>Event coordination</span>
                </div>
              </div>
              <Button
                onClick={() => window.open('https://discord.gg/9nWHTZkebx', '_blank')}
                className="w-full !bg-indigo-600 hover:!bg-indigo-700 !text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Join Discord Server
              </Button>
            </div>
          </div>

          {/* Facebook Community */}
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-blue-600/30 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073C0 18.062 4.388 23.027 10.125 23.927V15.542H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.98c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 font-protest">Facebook Community</h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Connect with our Facebook group to share updates, organize events, and spread awareness about our digital rights movement.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-blue-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Public awareness campaigns</span>
                </div>
                <div className="flex items-center gap-3 text-blue-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Event announcements</span>
                </div>
                <div className="flex items-center gap-3 text-blue-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Media sharing & updates</span>
                </div>
              </div>
              <Button
                onClick={() => {
                  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_GROUP_URL || 'https://www.facebook.com/groups'
                  window.open(facebookUrl, '_blank')
                }}
                className="w-full !bg-blue-700 hover:!bg-blue-800 !text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Join Facebook Group
              </Button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-black/60 backdrop-blur-sm border border-red-600/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-protest">
              Together We Are Unstoppable
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              Every voice matters. Every action counts. Join our communities and be part of the digital freedom revolution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-lg border-2 border-red-500">
                #EnoughIsEnough
              </span>
              <span className="bg-black/60 text-white px-6 py-2 rounded-full font-semibold border border-white/30">
                #DigitalRights
              </span>
              <span className="bg-black/60 text-white px-6 py-2 rounded-full font-semibold border border-white/30">
                #Revolution
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
