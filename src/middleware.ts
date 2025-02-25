import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/utils/supabase'

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createMiddlewareClient(request)
    const path = request.nextUrl.pathname

    // Get authenticated user using getUser()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      // If no authenticated user, redirect to login except for public paths
      if (!path.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      return response
    }

    // Get user profile using the authenticated user ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    // TODO: Add path-based authorization
    if (path.startsWith('/emp')) {
      if (profile.role === 2) {
        return NextResponse.redirect(new URL('/hr', request.url))
      } else if (profile.role === 3) {
        return NextResponse.redirect(new URL('/cbh', request.url))
      }
    }

    if (path.startsWith('/hr')) {
      if (profile.role === 1) {
        return NextResponse.redirect(new URL('/emp', request.url))
      } else if (profile.role === 3) {
        return NextResponse.redirect(new URL('/cbh', request.url))
      }
    }

    if (path.startsWith('/cbh')) {
      if (profile.role === 1) {
        return NextResponse.redirect(new URL('/emp', request.url))
      } else if (profile.role === 2) {
        return NextResponse.redirect(new URL('/hr', request.url))
      }
    }

    console.log(profile.role)
    return response
  } catch (e) {
    console.error('Middleware error:', e)
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
     */
    '/((?!_next/static|_next/image|favicon.ico|login|api|_supabase).*)',
  ],
}
