import { NextResponse } from 'next/server'
import crypto from 'crypto'

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID

export async function POST(request: Request) {
    try {
        const { email } = await request.json()
        console.log('Received subscription request for email:', email)

        if (!email) {
            console.log('No email provided')
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            )
        }

        if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_LIST_ID) {
            console.error('Missing Mailchimp configuration:', {
                hasApiKey: !!MAILCHIMP_API_KEY,
                hasServerPrefix: !!MAILCHIMP_SERVER_PREFIX,
                hasListId: !!MAILCHIMP_LIST_ID
            })
            return NextResponse.json(
                { message: 'Server configuration error' },
                { status: 500 }
            )
        }

        // Create MD5 hash of lowercase email for Mailchimp API
        const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex')

        // Log configuration (without exposing full API key)
        console.log('Mailchimp Configuration:', {
            serverPrefix: MAILCHIMP_SERVER_PREFIX,
            listId: MAILCHIMP_LIST_ID,
            apiKeyValid: MAILCHIMP_API_KEY?.length > 0
        })

        try {
            // First, check if the member exists and their status
            console.log('Checking member status...')
            const memberCheckResponse = await fetch(
                `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${emailHash}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
                        'Content-Type': 'application/json',
                    },
                }
            )

            const memberData = await memberCheckResponse.json()
            console.log('Member check response:', memberData)

            // If member exists, update their status
            if (memberCheckResponse.ok) {
                console.log('Existing member found with status:', memberData.status)

                if (memberData.status === 'subscribed') {
                    return NextResponse.json(
                        { message: 'You are already subscribed!' },
                        { status: 400 }
                    )
                }

                // Update existing member's status to pending
                const updateResponse = await fetch(
                    `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${emailHash}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email_address: email,
                            status_if_new: 'pending',
                            status: 'pending'
                        }),
                    }
                )

                if (!updateResponse.ok) {
                    const errorData = await updateResponse.json()
                    console.error('Update failed:', errorData)
                    throw new Error(`Update failed: ${errorData.detail || 'Unknown error'}`)
                }

                return NextResponse.json({
                    message: 'Please check your email to confirm your subscription!',
                    status: 'pending'
                })
            }

            // If member doesn't exist, create new subscription
            console.log('Creating new subscription...')
            const response = await fetch(
                `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email_address: email,
                        status: 'pending',
                    }),
                }
            )

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Subscription failed:', errorData)
                throw new Error(`Subscription failed: ${errorData.detail || 'Unknown error'}`)
            }

            console.log('Successfully added user to Mailchimp pending list')
            return NextResponse.json({
                message: 'Please check your email to confirm your subscription!',
                status: 'pending'
            })
        } catch (error) {
            console.error('Mailchimp API error:', error)
            throw error
        }
    } catch (error) {
        console.error('Subscription error:', error)
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Failed to subscribe' },
            { status: 500 }
        )
    }
} 