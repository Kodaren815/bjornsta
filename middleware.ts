import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // PASSWORD PROTECTION DISABLED - re-enable when DASHBOARD_PASSWORD env var is set in Netlify
  // const { pathname } = request.nextUrl
  // if (pathname.startsWith('/personal') && !pathname.startsWith('/personal/login')) {
  //   const cookie = request.cookies.get('bjornsta_auth')
  //   const password = process.env.DASHBOARD_PASSWORD || 'Bjornsta2026'
  //   if (!cookie || cookie.value !== password) {
  //     const loginUrl = new URL('/personal/login', request.url)
  //     return NextResponse.redirect(loginUrl)
  //   }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/personal/:path*'],
}
