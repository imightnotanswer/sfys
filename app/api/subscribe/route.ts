import { NextResponse } from 'next/server'

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            )
        }

        if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_LIST_ID) {
            console.error('Missing Mailchimp configuration')
            return NextResponse.json(
                { message: 'Server configuration error' },
                { status: 500 }
            )
        }

        const response = await fetch(
            `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_address: email,
                    status: 'subscribed',
                }),
            }
        )

        const data = await response.json()

        if (!response.ok) {
            // Handle specific Mailchimp errors
            if (data.title === 'Member Exists') {
                return NextResponse.json(
                    { message: 'You are already subscribed!' },
                    { status: 400 }
                )
            }
            throw new Error(data.detail || 'Failed to subscribe')
        }

        return NextResponse.json({ message: 'Successfully subscribed!' })
    } catch (error) {
        console.error('Mailchimp API error:', error)
        return NextResponse.json(
            { message: 'Failed to subscribe' },
            { status: 500 }
        )
    }
} 