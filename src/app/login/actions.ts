'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      return { error: 'Please provide both email and password' }
    }

    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      return { error: signInError.message }
    }

    // Get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: 'Authentication failed' }
    }

    // Get user profile and role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return { error: 'Failed to fetch user profile' }
    }

    // Return the role and let the client handle the redirect
    return { role: profile.role }
  } catch (error) {
    return { error: 'An unexpected error occurred' }
  }
}
