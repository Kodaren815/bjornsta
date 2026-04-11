import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, phone, language, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const secret = process.env.NETLIFY_EMAILS_SECRET
    if (!secret) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const siteUrl = process.env.URL || process.env.DEPLOY_URL || 'http://localhost:8888'

    const res = await fetch(`${siteUrl}/.netlify/functions/emails/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'netlify-emails-secret': secret,
      },
      body: JSON.stringify({
        from: 'noreply@bjornstaconsulting.com',
        to: 'fakhri.shehab@bjornstaconsulting.com',
        subject: `Nytt meddelande från ${name}${company ? ` – ${company}` : ''}`,
        parameters: { name, company, email, phone, language, service, message },
      }),
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
