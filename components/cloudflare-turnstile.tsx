'use client'

import { useEffect, useRef, useCallback } from 'react'

declare global {
    interface Window {
        turnstile: {
            render: (container: string | HTMLElement, options: {
                sitekey: string
                callback?: (token: string) => void
                'error-callback'?: () => void
                'expired-callback'?: () => void
            }) => string
            reset: (widgetId?: string) => void
            remove: (widgetId?: string) => void
        }
    }
}

interface CloudflareTurnstileProps {
    siteKey: string
    onVerify?: (token: string) => void
    onError?: () => void
    onExpired?: () => void
}

export default function CloudflareTurnstile({
    siteKey,
    onVerify,
    onError,
    onExpired
}: Readonly<CloudflareTurnstileProps>) {
    const turnstileRef = useRef<HTMLDivElement>(null)
    const widgetId = useRef<string | null>(null)
    const scriptLoaded = useRef<boolean>(false)
    const isRendering = useRef<boolean>(false)

    // Stable callback refs to prevent re-renders
    const onVerifyRef = useRef(onVerify)
    const onErrorRef = useRef(onError)
    const onExpiredRef = useRef(onExpired)

    // Update refs when props change
    useEffect(() => {
        onVerifyRef.current = onVerify
        onErrorRef.current = onError
        onExpiredRef.current = onExpired
    })

    const renderWidget = useCallback(() => {
        if (isRendering.current || !siteKey) return

        if (window.turnstile && turnstileRef.current && !widgetId.current) {
            isRendering.current = true
            console.log('Rendering Turnstile widget with sitekey:', siteKey)

            try {
                widgetId.current = window.turnstile.render(turnstileRef.current, {
                    sitekey: siteKey,
                    callback: (token: string) => {
                        console.log('Turnstile token received:', token.substring(0, 20) + '...')
                        onVerifyRef.current?.(token)
                    },
                    'error-callback': () => {
                        console.error('Turnstile error callback triggered')
                        onErrorRef.current?.()
                    },
                    'expired-callback': () => {
                        console.warn('Turnstile token expired')
                        onExpiredRef.current?.()
                    },
                })
                console.log('Turnstile widget rendered with ID:', widgetId.current)
            } catch (error) {
                console.error('Failed to render Turnstile widget:', error)
            } finally {
                isRendering.current = false
            }
        }
    }, [siteKey])

    const loadScript = useCallback(() => {
        if (scriptLoaded.current || window.turnstile) {
            renderWidget()
            return
        }

        // Check if script is already being loaded
        const existingScript = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]')
        if (existingScript) {
            existingScript.addEventListener('load', renderWidget, { once: true })
            return
        }

        console.log('Loading Turnstile script...')
        const script = document.createElement('script')
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
        script.async = true
        script.defer = true
        script.onload = () => {
            console.log('Turnstile script loaded successfully')
            scriptLoaded.current = true
            renderWidget()
        }
        script.onerror = () => {
            console.error('Failed to load Turnstile script')
            scriptLoaded.current = false
        }
        document.head.appendChild(script)
    }, [renderWidget])

    useEffect(() => {
        // Don't proceed if no site key
        if (!siteKey) {
            console.error('Turnstile site key is missing')
            return
        }

        // If widget already exists, don't re-render
        if (widgetId.current) {
            console.log('Turnstile widget already exists, skipping render')
            return
        }

        loadScript()

        // Cleanup function
        return () => {
            if (window.turnstile && widgetId.current && !isRendering.current) {
                try {
                    console.log('Removing existing Turnstile widget')
                    window.turnstile.remove(widgetId.current)
                } catch (error) {
                    console.warn('Failed to remove widget:', error)
                }
                widgetId.current = null
                isRendering.current = false
            }
        }
    }, [siteKey, loadScript])

    // Reset function (can be called externally if needed)
    const resetWidget = useCallback(() => {
        if (window.turnstile && widgetId.current) {
            try {
                window.turnstile.reset(widgetId.current)
                console.log('Turnstile widget reset')
            } catch (error) {
                console.warn('Failed to reset widget:', error)
            }
        }
    }, [])

    // Expose reset function via ref (optional)
    useEffect(() => {
        if (turnstileRef.current) {
            (turnstileRef.current as any).resetTurnstile = resetWidget
        }
    }, [resetWidget])

    return (
        <div>
            <div ref={turnstileRef} style={{ minHeight: '65px', width: '100%' }} />
            {!siteKey && (
                <p style={{ color: 'red', fontSize: '12px' }}>
                    Error: Turnstile site key is not configured
                </p>
            )}
        </div>
    )
}
