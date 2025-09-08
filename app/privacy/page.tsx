import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Shield, Eye, Lock, Users, Database, Key } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 rounded-full px-6 py-3 mb-8">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold text-lg">Privacy Protection</span>
            </div>
            <h1 className="text-5xl md:text-6xl  font-protest
            lg:text-7xl font-black text-white mb-8 leading-tight">
              Privacy
              {" "}
              <span className="block text-blue-500 mt-2">
                Policy
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
              Your digital rights include the fundamental right to privacy. We protect your data with the highest standards.
            </p>
          </div>

          {/* Privacy Principles */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-black/60 backdrop-blur-sm border border-blue-600/20 rounded-2xl p-8 text-center">
              <Eye className="w-12 h-12 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 font-protest">No Tracking</h3>
              <p className="text-gray-300 text-lg">
                We don't track your browsing behavior or sell your data to third parties.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-sm border border-green-600/20 rounded-2xl p-8 text-center">
              <Lock className="w-12 h-12 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 font-protest">Data Encryption</h3>
              <p className="text-gray-300 text-lg">
                All data is encrypted in transit and at rest using industry-standard protocols.
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-sm border border-purple-600/20 rounded-2xl p-8 text-center">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 font-protest">User Control</h3>
              <p className="text-gray-300 text-lg">
                You have full control over your data and can request deletion at any time.
              </p>
            </div>
          </div>

          {/* What We Collect */}
          <div className="mb-20">
            <div className="bg-black/60 backdrop-blur-sm border border-yellow-600/20 rounded-2xl p-8">
              <h2 className="text-4xl font-bold font-protest text-white mb-8 flex items-center gap-3">
                <Database className="w-8 h-8 text-yellow-400" />
                What Information We Collect
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Required Information</h3>
                  <ul className="space-y-3 text-gray-300 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Google account email (for authentication)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Name (for petition signatures)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Country (optional, for petition)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Skills & motivation (for team applications)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">What We Don't Collect</h3>
                  <ul className="space-y-3 text-gray-300 text-lg">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Browsing history or cookies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Location data or device information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Social media content or contacts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Personal messages or communications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Security Measures */}
          <div className="mb-20">
            <div className="bg-black/60 backdrop-blur-sm border border-red-600/20 rounded-2xl p-8">
              <h2 className="text-4xl font-bold font-protest text-white mb-8 flex items-center gap-3">
                <Key className="w-8 h-8 text-red-400" />
                Security Measures
              </h2>
              <div className="space-y-6">
                <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-6">
                  <h3 className="text-red-300 font-bold text-xl mb-3 font-protest">Google OAuth Authentication</h3>
                  <p className="text-white text-lg">
                    We use Google's secure OAuth system for authentication, ensuring we never see or store your password.
                  </p>
                </div>
                
                <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-xl p-6">
                  <h3 className="text-yellow-300 font-bold text-xl mb-3 font-protest">Cloudflare Turnstile Protection</h3>
                  <p className="text-white text-lg">
                    Bot protection prevents spam and abuse while respecting user privacy - no CAPTCHAs required.
                  </p>
                </div>

                <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-6">
                  <h3 className="text-blue-300 font-bold text-xl mb-3 font-protest">Supabase Security</h3>
                  <p className="text-white text-lg">
                    Database hosted with enterprise-grade security, Row Level Security (RLS), and encrypted connections.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Rights */}
          <div className="mb-20">
            <div className="bg-black/60 backdrop-blur-sm border border-green-600/20 rounded-2xl p-8">
              <h2 className="text-4xl font-bold text-white mb-8 font-protest">Your Data Rights</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">You Can:</h3>
                  <ul className="space-y-4 text-gray-300 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 font-bold">→</span>
                      <span>Request a copy of your data at any time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 font-bold">→</span>
                      <span>Delete your account and all associated data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 font-bold">→</span>
                      <span>Update or correct your information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 font-bold">→</span>
                      <span>Withdraw consent for data processing</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">We Commit To:</h3>
                  <ul className="space-y-4 text-gray-300 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">→</span>
                      <span>Respond to data requests within 30 days</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">→</span>
                      <span>Never sell your personal information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">→</span>
                      <span>Notify you of any data breaches immediately</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">→</span>
                      <span>Use data only for the stated purpose</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Privacy */}
          <div className="text-center">
            <div className="bg-black/60 backdrop-blur-sm border border-purple-600/20 rounded-2xl p-12">
              <h2 className="text-4xl font-bold text-white mb-6 font-protest">
                Questions About Privacy?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                We believe transparency is essential for digital rights. If you have questions about how we handle your data, 
                we're here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="bg-blue-600/10 border border-blue-600/30 px-6 py-3 rounded-full text-blue-300 font-semibold text-lg">
                  #PrivacyMatters
                </span>
                <span className="bg-red-600/10 border border-red-600/30 px-6 py-3 rounded-full text-red-300 font-semibold text-lg">
                  #NoSurveillance
                </span>
                <span className="bg-green-600/10 border border-green-600/30 px-6 py-3 rounded-full text-green-300 font-semibold text-lg">
                  #DataRights
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
