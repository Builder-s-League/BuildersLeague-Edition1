import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/utils/supabase'

export async function middleware(request: NextRequest) {
  try {
    console.log('middleware')
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createMiddlewareClient(request)

    // Refresh session if expired
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()
    console.log('Session:', session, 'Session Error:', sessionError)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    console.log('Auth User:', user)
    if (user) {
      console.log(user.id)
      // Fetch profile instead of users table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      console.log('Profile Query Error:', error)
      console.log('Profile Data:', profile)
      if (error) {
        console.error('Profile fetch error:', error.message, error.details)
        throw error
      }
      if (!profile) throw new Error('Profile not found')

      console.log('profile', profile)
      const path = request.nextUrl.pathname

      // Update role checks based on your new role numbers
      if (path.startsWith('/cbh')) {
        if (profile.role !== 3) {
          // CBH Admin role
          return NextResponse.redirect(new URL('/login', request.nextUrl))
        }
      }

      if (path.startsWith('/hr')) {
        if (profile.role !== 2) {
          // HR/Org role
          return NextResponse.redirect(new URL('/login', request.nextUrl))
        }
      }

      if (path.startsWith('/emp')) {
        if (profile.role !== 1) {
          // Employee role
          return NextResponse.redirect(new URL('/login', request.nextUrl))
        }
      }
    }

    return response
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: { headers: request.headers },
    })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - api (API routes)
     * - _supabase (Supabase internal routes)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|login|api|_supabase).*)',
  ],
}
