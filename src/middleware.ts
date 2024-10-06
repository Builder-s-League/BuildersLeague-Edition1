import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/utils/supabase'
import { UserData } from '@/types/user'

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createMiddlewareClient(request)

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    await supabase.auth.getSession()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('email', user.email)

      if (error) throw error
      if (!data || !data?.length) throw new Error('user not found')

      const path = request.nextUrl.pathname

      const currentUser = data[0] as unknown as UserData

      if (path.startsWith('/cbh')) {
        if (currentUser.role !== 0) {
          return NextResponse.redirect(new URL('login', request.nextUrl))
        }
        NextResponse.next()
      }

      if (path.startsWith('/hr')) {
        if (currentUser.role !== 1) {
          return NextResponse.redirect(new URL('login', request.nextUrl))
        }
        NextResponse.next()
      }

      if (path.startsWith('/emp')) {
        if (currentUser.role !== 2) {
          return NextResponse.redirect(new URL('login', request.nextUrl))
        }
        NextResponse.next()
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
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
