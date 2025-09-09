import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import HashtagTicker from "@/components/hashtag-ticker"
import MovementStats from "@/components/movement-stats"
import PetitionSection from "@/components/petition-section"
import JoinTeamSection from "@/components/join-team-section"
import CommunitySection from "@/components/community-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-x-hidden">
      <div className="relative">
        {/* Background Elements */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        {/* Animated Grid */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <HashtagTicker />
          <MovementStats />
          <PetitionSection />
          <JoinTeamSection />
          <CommunitySection />
          <Footer />
        </div>

        {/* Floating Elements */}
        <div className="fixed top-20 right-10 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75 pointer-events-none" />
        <div className="fixed bottom-40 left-10 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-60 pointer-events-none" />
      </div>
    </div>
  )
}
