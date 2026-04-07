import { NextResponse } from 'next/server'

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bjornsta.se'
  const response = NextResponse.redirect(new URL('/personal/login', siteUrl))
  response.cookies.delete('bjornsta_auth')
  return response
}
