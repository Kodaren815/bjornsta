import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()
  const correctPassword = process.env.DASHBOARD_PASSWORD || 'Bjornsta2026'

  if (password === correctPassword) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('bjornsta_auth', correctPassword, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 8, // 8 hours
      sameSite: 'lax',
    })
    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
