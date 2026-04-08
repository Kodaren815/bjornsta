import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const loginUrl = new URL('/personal/login', request.url)
  const response = NextResponse.redirect(loginUrl)
  response.cookies.delete('bjornsta_auth')
  return response
}
