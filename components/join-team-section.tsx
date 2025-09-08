"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { createSupabaseWithTurnstile } from "@/lib/supabase"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Share2, MessageCircle, Users, Zap, Shield, Globe } from "lucide-react"
import CloudflareTurnstile from "@/components/cloudflare-turnstile"

const revolutionHashtags = [
  "#DigitalFreedom", "#Revolution", "#Resistance", "#WakeUpYouth",
  "#EndCensorship", "#DigitalRights", "#EndCorruption", "#SocialJustice"
]

const skillAreas = [
  { icon: "💻", title: "Tech & Development", desc: "Coding, cybersecurity, blockchain" },
  { icon: "📱", title: "Social Media", desc: "Content creation, community management" },
  { icon: "📝", title: "Writing & Media", desc: "Journalism, blogging, documentation" },
  { icon: "🎨", title: "Creative Arts", desc: "Design, video editing, photography" },
  { icon: "⚖️", title: "Legal & Policy", desc: "Constitutional law, digital rights" },
  { icon: "🏛️", title: "Advocacy", desc: "Public speaking, organizing, lobbying" }
]

const skillOptions = [
  { value: "tech-development", label: "Tech & Development" },
  { value: "social-media", label: "Social Media" },
  { value: "writing-media", label: "Writing & Media" },
  { value: "creative-arts", label: "Creative Arts" },
  { value: "legal-policy", label: "Legal & Policy" },
  { value: "advocacy", label: "Advocacy" },
  { value: "marketing", label: "Marketing & PR" },
  { value: "project-management", label: "Project Management" },
  { value: "research", label: "Research & Analysis" },
  { value: "translation", label: "Translation" },
  { value: "other", label: "Other" }
]

export default function JoinTeamSection() {
  const { user, signInWithGoogle } = useAuth()
  const [formData, setFormData] = useState({
    skills: '',
    phone_number: '',
    handle: '',
    motivation: ''
  })
  const [showDiscordModal, setShowDiscordModal] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const turnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleTurnstileVerify = useCallback((token: string) => {
    console.log('Token received in join team form:', token.substring(0, 20) + '...')
    setTurnstileToken(token)
  }, [])

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken('')
    setSubmitMessage('Bot verification failed. Please try again.')
    if (window.turnstile) {
      window.turnstile.reset()
    }
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setSubmitMessage('Please sign in first')
      return
    }

    if (!turnstileToken) {
      setSubmitMessage('Please complete bot verification')
      return
    }

    if (!formData.skills.trim() || !formData.phone_number.trim() || !formData.motivation.trim()) {
      setSubmitMessage('Please fill in all required fields')
      return
    }

    // Basic phone number validation
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/
    if (!phoneRegex.test(formData.phone_number.trim())) {
      setSubmitMessage('Please enter a valid phone number')
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const supabaseWithTurnstile = createSupabaseWithTurnstile(turnstileToken)

      const { error } = await supabaseWithTurnstile
        .from('team_applications')
        .insert([
          {
            skills: formData.skills.trim(),
            phone_number: formData.phone_number.trim(),
            handle: formData.handle.trim() || null,
            motivation: formData.motivation.trim(),
            user_id: user.id,
          }
        ])
        .select()

      if (error) {
        console.error('Database error:', error)
        if (error.message.includes('turnstile') || error.message.includes('captcha') || error.message.includes('bot')) {
          setSubmitMessage('Bot verification failed. Please try again.')
        } else {
          setSubmitMessage('Failed to submit application. Please try again.')
        }
        return
      }

      setSubmitMessage('Welcome to the movement! Your application has been submitted successfully.')
      setFormData({ skills: '', phone_number: '', handle: '', motivation: '' })
      setTurnstileToken('')
      setShowDiscordModal(true)

      if (window.turnstile) {
        window.turnstile.reset()
      }

    } catch (error) {
      console.error('Submit error:', error)
      setSubmitMessage('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [user, turnstileToken, formData])

  const shareOnTwitter = () => {
    const text = encodeURIComponent("I'm joining the digital freedom movement in Nepal! #EnoughIsEnough #RestoreDigitalNepal")
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent("Join the digital freedom movement in Nepal! Fighting for our constitutional rights: " + window.location.href)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  return (
    <section id="join-team" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 rounded-full px-6 py-3 mb-8">
            <span className="text-blue-400 font-semibold text-lg">Join the Movement</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight font-protest">
            Be the Change
            {" "}
            <span className="block text-[#1E88E5] mt-2">
              You Want
            </span>

          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Transform your skills into a force for digital freedom. Join our team of advocates, creators, and change-makers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Application Form */}
          <div className="bg-black/60 backdrop-blur-sm  overflow-hidden">
            <div className=" p-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Users className="w-6 h-6" />
                Join Our Team
              </h3>
              <p className="text-gray-300 mt-2 text-lg">Secure application powered by Google Auth</p>
            </div>

            <div className="p-8">
              {!user ? (
                <div className="text-center space-y-8">
                  <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-4">Secure Authentication Required</h4>
                    <p className="text-gray-300 text-lg mb-8">Sign in with Google to join our team and protect against spam</p>
                  </div>
                  <Button
                    onClick={signInWithGoogle}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl px-10 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Continue with Google
                    </span>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-4">
                    <p className="text-blue-400 font-semibold text-lg flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Authenticated as {user.email}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="skills" className="block text-white font-semibold text-lg mb-3">Your Skills & Expertise *</label>
                      <select
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        className="w-full bg-black/40 border border-white/20 text-white text-lg p-4 rounded-xl focus:border-blue-400 transition-colors duration-300"
                        required
                      >
                        <option value="" className="bg-black text-white">Select your primary skill area</option>
                        {skillOptions.map((skill) => (
                          <option key={skill.value} value={skill.value} className="bg-black text-white">
                            {skill.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="phone_number" className="block text-white font-semibold text-lg mb-3">Phone Number *</label>
                      <Input
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="bg-black/40 border-white/20 text-white placeholder-gray-400 text-lg py-4 px-4 rounded-xl focus:border-blue-400 transition-colors duration-300"
                        placeholder="+977 98xxxxxxxx or your phone number"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="handle" className="block text-white font-semibold text-lg mb-3">Social Media Handle (Optional)</label>
                      <Input
                        id="handle"
                        name="handle"
                        value={formData.handle}
                        onChange={handleInputChange}
                        className="bg-black/40 border-white/20 text-white placeholder-gray-400 text-lg py-4 px-4 rounded-xl focus:border-blue-400 transition-colors duration-300"
                        placeholder="@yourhandle or your social media profile"
                      />
                    </div>

                    <div>
                      <label htmlFor="motivation" className="block text-white font-semibold text-lg mb-3">Why Join This Movement? *</label>
                      <Textarea
                        id="motivation"
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        className="bg-black/40 border-white/20 text-white placeholder-gray-400 text-lg p-4 rounded-xl min-h-[120px] resize-none focus:border-blue-400 transition-colors duration-300"
                        placeholder="What motivates you to fight for digital freedom in Nepal?"
                        required
                      />
                    </div>

                    <div className=" p-4">
                      <CloudflareTurnstile
                        siteKey={turnstileSiteKey || ''}
                        onVerify={handleTurnstileVerify}
                        onError={handleTurnstileError}
                        onExpired={handleTurnstileError}
                      />
                    </div>

                    {submitMessage && (
                      <div className={`p-4 rounded-xl font-semibold text-lg ${submitMessage.includes('Welcome') || submitMessage.includes('successfully')
                          ? 'bg-green-600/10 border border-green-600/30 text-green-400'
                          : 'bg-red-600/10 border border-red-600/30 text-red-400'
                        }`}>
                        {submitMessage}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-black hover:text-white font-bold text-xl py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                      disabled={isSubmitting || !turnstileToken}
                    >
                      <span className="flex items-center justify-center gap-2 text-xl ">
                        <Globe className="w-6 h-6" />
                        {isSubmitting ? 'Joining the Movement...' : 'Join the Revolution'}
                      </span>
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Skills & Info Display */}
          <div className="space-y-8">
            {/* Skills Areas */}
            <div className="bg-black/60 p-8">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-4 h-4  rounded-full" />
                We Need Your Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillAreas.map((skill) => (
                  <div
                    key={skill.title}
                    className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-4 hover:bg-blue-600/20 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <div>
                        <div className="text-white font-semibold text-lg font-protest">{skill.title}</div>
                        <div className="text-gray-400 text-base mt-1 ">{skill.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-black/60 p-8">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Share2 className="w-7 h-7" />
                Spread the Message
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {revolutionHashtags.map((hashtag) => (
                  <div
                    key={hashtag}
                    className="bg-blue-600/10 border border-blue-600/30 rounded-lg px-4 py-3 text-blue-200 font-medium text-center hover:bg-blue-600/20 transition-colors duration-300 cursor-pointer text-lg"
                  >
                    {hashtag}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={shareOnTwitter}
                  className="bg-blue-600 hover:bg-blue-600 text-black hover:text-white rounded-xl px-4 py-2 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Share
                </Button>
                <Button
                  onClick={shareOnFacebook}
                  className="bg-blue-700 hover:bg-blue-800 text-black hover:text-white rounded-xl px-4 py-2 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Share
                </Button>
                <Button
                  onClick={shareOnWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-black hover:text-white rounded-xl px-4 py-2 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Discord Modal */}
        {showDiscordModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-blue-600/30 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Welcome to the Movement!</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Your application has been submitted successfully. Join our Discord community to connect with other revolutionaries and stay updated on our activities.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      window.open('https://discord.gg/restore-digital-nepal', '_blank')
                      setShowDiscordModal(false)
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Join Discord Community
                  </Button>
                  <Button
                    onClick={() => setShowDiscordModal(false)}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
