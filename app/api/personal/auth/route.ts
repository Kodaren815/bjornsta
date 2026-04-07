import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const correctPassword = process.env.DASHBOARD_PASSWORD || 'Bjornsta2026'

  if (password === correctPassword) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('bjornsta_auth', correctPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
      sameSite: 'lax',
    })
    return response
  }

  return NextResponse.json(
    { success: false, error: 'Fel lösenord' },
    { status: 401 }
  )
}
