import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Retrieve all cookies from the request
        get(name: string) {
          const cookie = request.cookies.get(name)
          return cookie ? cookie.value : undefined
        },
        // Set cookies in the response
        set(name: string, value: string, options?: any) {
          supabaseResponse.cookies.set(name, value, options)
        },
      },
    },
  )

  // Avoid placing logic between createServerClient and supabase.auth.getUser
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // Redirect to login if no user is found
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Return the modified supabaseResponse object
  return supabaseResponse
}
