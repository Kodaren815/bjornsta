import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const correctPassword = process.env.DASHBOARD_PASSWORD || 'Bjornsta2026'

  if (password === correctPassword) {
    const redirectUrl = new URL('/personal', request.url)
    const response = NextResponse.json({ success: true, redirect: redirectUrl.pathname })
    response.cookies.set('bjornsta_auth', correctPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false, error: 'Fel lösenord' }, { status: 401 })
}
