            import { NextRequest, NextResponse } from 'next/server'

// The payload we receive from the frontend
interface ApplicationPayload {
  // PII — sent to Google Sheets
  firstName: string
  lastName: string
  email: string
  phone: string
  // The bridge ID — stored in BOTH Google Sheets and PostHog
  posthog_id: string
  // All other form fields...
  [key: string]: unknown
}

export async function POST(req: NextRequest) {
  const body: ApplicationPayload = await req.json()

  // Validate required fields
  if (!body.email || !body.posthog_id) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  try {
    // Send ALL data (including posthog_id) to Google Sheets
    await sendToGoogleSheets(body)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submission failed:', error)
    return NextResponse.json(
      { error: 'Submission failed' },
      { status: 500 }
    )
  }
}

async function sendToGoogleSheets(data: ApplicationPayload) {
  // Use your existing Google Sheets API integration
  // The posthog_id column in your Sheet is the bridge:
  // open PostHog → search for that distinct_id → see the full user journey
  const SHEET_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL!
  const response = await fetch(SHEET_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      posthog_id: data.posthog_id, // ← The Golden Link
      occupation: data.occupation,
      education_level: data.educationLevel,
      has_laptop: data.hasLaptop,
      learning_mode: data.learningMode,
      city: data.city,
      referral_source: data.referralSource,
      // DO NOT send essay answers — they are private
    }),
  })

  if (!response.ok) {
    throw new Error(`Google Sheets error: ${response.status}`)
  }
}