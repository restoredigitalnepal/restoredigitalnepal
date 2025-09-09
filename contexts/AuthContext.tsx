'use client'

import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
    // Accept optional target section id to scroll after login
    signInWithGoogle: (targetSectionId?: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { readonly children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const signInWithGoogle = async (targetSectionId?: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    // Use popup flow to avoid full-page reload
                    skipBrowserRedirect: true,
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            })

            if (error) {
                console.error('Error signing in:', error.message)
                return
            }

            const authUrl = data?.url
            if (!authUrl) return

            const width = 600
            const height = 700
            const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2)
            const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2)

            const popup = window.open(
                authUrl,
                'supabase-oauth',
                `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`
            )

            if (!popup) {
                console.warn('Popup blocked. Please allow popups for this site.')
                // As a fallback, redirect the current window (will reload)
                window.location.href = authUrl
                return
            }

            // Poll for session; closes popup and scrolls when authenticated
            const pollIntervalMs = 500
            const maxWaitMs = 120000 // 2 minutes timeout
            const start = Date.now()
            const timer = window.setInterval(async () => {
                const elapsed = Date.now() - start
                if (popup.closed || elapsed > maxWaitMs) {
                    window.clearInterval(timer)
                    return
                }

                try {
                    const { data: sess } = await supabase.auth.getSession()
                    if (sess.session) {
                        window.clearInterval(timer)
                        popup.close()
                        // Smooth scroll to the target section if provided
                        if (targetSectionId) {
                            const el = document.getElementById(targetSectionId)
                            if (el) {
                                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                        }
                    }
                } catch (e) {
                    // Ignore transient errors while polling
                }
            }, pollIntervalMs)
        } catch (e) {
            console.error('Unexpected error during Google sign-in:', e)
        }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error signing out:', error.message)
        }
    }

    const value = useMemo(() => ({
        user,
        session,
        loading,
        signInWithGoogle,
        signOut,
    }), [user, session, loading])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
