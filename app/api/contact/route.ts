import { NextResponse } from 'next/server'
import { Resend } from 'resend'

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, phone, language, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: 'Björnsta Website <noreply@bjornstaconsulting.com>',
      to: 'fakhri.shehab@bjornstaconsulting.com',
      replyTo: email,
      subject: `Nytt meddelande från ${esc(name)}${company ? ` – ${esc(company)}` : ''}`,
      html: `
        <h2 style="color:#7c3aed">Nytt kontaktformulär — Björnsta</h2>
        <p><strong>Namn:</strong> ${esc(name)}</p>
        ${company ? `<p><strong>Företag:</strong> ${esc(company)}</p>` : ''}
        <p><strong>E-post:</strong> ${esc(email)}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${esc(phone)}</p>` : ''}
        ${language ? `<p><strong>Föredragen kommunikation:</strong> ${esc(language)}</p>` : ''}
        ${service ? `<p><strong>Tjänst:</strong> ${esc(service)}</p>` : ''}
        <hr style="border:1px solid #e5e7eb;margin:16px 0"/>
        <p><strong>Meddelande:</strong></p>
        <p style="white-space:pre-wrap">${esc(message)}</p>
      `,
    })

    if (error) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
