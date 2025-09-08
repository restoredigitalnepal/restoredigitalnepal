"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { createSupabaseWithTurnstile } from "@/lib/supabase"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import CloudflareTurnstile from "@/components/cloudflare-turnstile"

const bannedPlatforms = [
  "Facebook", "Instagram", "YouTube", "X (Twitter)", "LinkedIn", "Reddit",
  "WhatsApp", "Discord", "Pinterest", "Signal", "Threads", "Snapchat",
  "TikTok", "Telegram", "Viber", "WeChat", "Skype", "Zoom",
  "Google Meet", "Microsoft Teams", "Clubhouse", "Twitch", "Spotify",
  "SoundCloud", "Bandcamp", "Patreon",
]

export default function PetitionSection() {
  const { user, signInWithGoogle } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')

  const turnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleCheckboxChange = useCallback((checked: boolean) => {
    setFormData(prev => ({ ...prev, consent: checked }))
  }, [])

  const handleTurnstileVerify = useCallback((token: string) => {
    console.log('Token received in petition form:', token.substring(0, 20) + '...')
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

    if (!formData.name.trim()) {
      setSubmitMessage('Name is required')
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const supabaseWithTurnstile = createSupabaseWithTurnstile(turnstileToken)

      const { error } = await supabaseWithTurnstile
        .from('petition')
        .insert([
          {
            name: formData.name.trim(),
            message: formData.message.trim() || null,
            user_id: user.id,
          }
        ])
        .select()

      if (error) {
        console.error('Database error:', error)
        if (error.message.includes('turnstile') || error.message.includes('captcha') || error.message.includes('bot')) {
          setSubmitMessage('Bot verification failed. Please try again.')
        } else {
          setSubmitMessage('Failed to submit petition. Please try again.')
        }
        return
      }

      setSubmitMessage('Thank you! Your petition has been submitted successfully.')
      setFormData({ name: '',  message: '', consent: false })
      setTurnstileToken('')

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

  return (
    <section id="petition" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-6 py-3 mb-8">
            <span className="text-red-400 font-semibold text-lg">Take Action</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight font-protest">
            Sign the Digital Rights
            {" "}
            <span className="block text-red-500 mt-2">
              Petition
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Your voice matters. Join thousands demanding the restoration of digital freedom in Nepal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Petition Form */}
          <div className="bg-black/60 backdrop-blur-sm border overflow-hidden">
            <div className=" p-6">
              <h3 className="text-2xl font-bold text-white">Add Your Voice</h3>
              <p className="text-gray-300 mt-2 text-lg">Secure petition powered by Google Auth</p>
            </div>

            <div className="p-8">
              {!user ? (
                <div className="text-center space-y-8">
                  <div className="w-20 h-20 mx-auto bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9L21 9ZM3 13V11L9 11V13L3 13ZM19 17V19L9 19V17L19 17ZM12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-4">Secure Authentication Required</h4>
                    <p className="text-gray-300 text-lg mb-8">Sign in with Google to add your signature and protect against spam</p>
                  </div>
                  <Button 
                    onClick={signInWithGoogle}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-10 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </span>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-600/10 border border-green-600/30 rounded-xl p-4">
                    <p className="text-green-400 font-semibold text-lg flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Authenticated as {user.email}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-semibold text-lg mb-3">Your Name *</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-black/40 border-white/20 text-white placeholder-gray-400 text-lg py-4 px-4 rounded-xl focus:border-red-400 transition-colors duration-300"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>


                    <div>
                      <label htmlFor="message" className="block text-white font-semibold text-lg mb-3">Your Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="bg-black/40 border-white/20 text-white placeholder-gray-400 text-lg p-4 rounded-xl min-h-[120px] resize-none focus:border-red-400 transition-colors duration-300"
                        placeholder="Why is digital freedom important to you?"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e.target.checked)}
                        className="border-white/40 data-[state=checked]:bg-red-600"
                      />
                      <label htmlFor="consent" className="text-gray-300 text-md leading-relaxed">
                        I consent to making this petition public if needed for advocacy
                      </label>
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
                      <div className={`p-4 rounded-xl font-semibold text-lg ${
                        submitMessage.includes('success') || submitMessage.includes('Thank you')
                          ? 'bg-green-600/10 border border-green-600/30 text-green-400'
                          : 'bg-red-600/10 border border-red-600/30 text-red-400'
                      }`}>
                        {submitMessage}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                      disabled={isSubmitting || !turnstileToken}
                    >
                      <span className="text-xl">
                        {isSubmitting ? 'Submitting Your Voice...' : 'Submit Petition'}
                      </span>
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Platform Impact Display */}
          <div className="space-y-8">
            <div className="bg-black/60  p-8">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded-full" />
                Platforms Under Ban
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {bannedPlatforms.map((platform) => (
                  <div
                    key={platform}
                    className="bg-red-600/10 border border-red-600/30 rounded-lg px-4 py-3 text-center relative overflow-hidden group hover:bg-red-600/20 transition-colors duration-300"
                  >
                    <span className="relative z-10 text-red-200 font-medium text-lg font-protest">{platform}</span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-60">
                      <div className="w-full h-0.5 bg-red-500 transform rotate-45" />
                      <div className="w-full h-0.5 bg-red-500 transform -rotate-45 absolute" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <div className="text-red-400 font-bold text-xl mb-2">All banned by government decree</div>
                <div className="text-gray-400 text-lg">Affecting 30+ million Nepali users</div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-sm  p-8">
              <h3 className="text-3xl font-bold text-white mb-8">Constitutional Rights</h3>
              <div className="space-y-4">
                <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-xl p-6">
                  <div className="text-yellow-300 font-bold text-xl mb-2">Article 17(2)(a)</div>
                  <div className="text-white text-lg font-protest">Freedom of opinion and expression</div>
                </div>
                <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-6">
                  <div className="text-blue-300 font-bold text-xl mb-2">Article 19</div>
                  <div className="text-white text-lg font-protest">Right to communication</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
