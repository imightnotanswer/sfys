'use client'

import { useState } from 'react'

interface MailingListSignupProps {
    isFooter?: boolean
}

export default function MailingListSignup({ isFooter = false }: MailingListSignupProps) {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubmitting(true)

        try {
            const formData = new FormData()
            formData.append('EMAIL', email)

            await fetch('https://touristswelcome.us17.list-manage.com/subscribe/post?u=e5419cc011afba380c93cf181&id=b12fce1b52', {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            })

            setEmail('')
            // Since we can't get the actual response due to CORS, we'll just assume success
            // In a production environment, you might want to use their API or a proxy
        } catch (error) {
            console.error('Error submitting form:', error)
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
        </form>
    )
} 