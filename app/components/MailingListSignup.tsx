'use client'

import { useState } from 'react'

interface MailingListSignupProps {
    isFooter?: boolean
}

export default function MailingListSignup({ isFooter = false }: MailingListSignupProps) {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubmitting(true)
        setStatus('idle')
        setErrorMessage('')

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to subscribe')
            }

            setEmail('')
            setStatus('success')
        } catch (error) {
            console.error('Error submitting form:', error)
            setStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={`flex w-full border-2 transition-colors ${isFooter ? 'border-[#eceadf]' : 'border-black'}`}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="JOIN MAILING LIST"
                className="px-2 py-0 text-xs bg-transparent outline-none flex-1 min-w-0 text-center placeholder:text-center"
                required
            />
            <button
                type="submit"
                disabled={isSubmitting}
                className={`px-2 py-0 text-xs border-l-2 transition-colors ${isFooter
                    ? 'bg-[#ece8d9] text-black border-[#ece8d9]'
                    : 'bg-black text-[#eceadf] border-black'
                    }`}
            >
                &gt;
            </button>
            {status === 'success' && (
                <p className="absolute mt-6 text-xs text-green-600">Successfully subscribed!</p>
            )}
            {status === 'error' && (
                <p className="absolute mt-6 text-xs text-red-600">{errorMessage}</p>
            )}
        </form>
    )
} 